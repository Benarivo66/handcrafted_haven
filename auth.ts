import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { SellerField } from './src/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users } from './src/app/lib/placeholder-data';

// Use placeholder data if database is not available
const usePlaceholderData = !process.env.POSTGRES_URL;
const sql = usePlaceholderData ? null : postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<SellerField | undefined> {
    try {
      if (usePlaceholderData) {
        return users.find(user => user.email === email);
      }
      
      if (!sql) {
        return users.find(user => user.email === email);
      }
      
      const user = await sql<SellerField[]>`SELECT * FROM haven_users WHERE email=${email}`;
      return user[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Fallback to placeholder data
      return users.find(user => user.email === email);
    }
  }

  export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    trustHost: true,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            
            // Handle password comparison - placeholder data has plain text passwords
            let passwordsMatch = false;
            if (usePlaceholderData) {
              // For placeholder data, compare plain text passwords
              passwordsMatch = password === user.password;
            } else {
              // For database, use bcrypt comparison
              passwordsMatch = await bcrypt.compare(password, user.password);
            }
            
            if (passwordsMatch) {
              // Return user with required fields for NextAuth
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                isSeller: user.isSeller || false,
              };
            }
          }
          
          console.log('Invalid credentials');
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.isSeller = user.isSeller;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user = {
            ...session.user,
            id: token.id as string,
            name: token.name as string,
            email: token.email as string,
            isSeller: token.isSeller as boolean,
          };
        }
        return session;
      },
    },
  });