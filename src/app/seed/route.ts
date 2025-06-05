import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, products, reviews } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function resetDatabase(sql: postgres.Sql) {
  await sql`DROP TABLE IF EXISTS haven_reviews;`;
  await sql`DROP TABLE IF EXISTS haven_products;`;
  await sql`DROP TABLE IF EXISTS haven_users;`;
}

async function seedUsers(sql: postgres.Sql) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE haven_users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      isSeller BOOLEAN DEFAULT FALSE,
      bio TEXT,
      phone TEXT,
      profileImage TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await sql`
      INSERT INTO haven_users (id, name, email, password, isSeller, bio, phone, profileImage)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.isSeller}, ${user.bio}, ${user.phone}, ${user.profileImage})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedProducts(sql: postgres.Sql) {
  await sql`
    CREATE TABLE haven_products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      imageUrl TEXT NOT NULL,
      category TEXT NOT NULL,
      sellerId UUID NOT NULL REFERENCES haven_users(id) ON DELETE CASCADE
    );
  `;

  for (const product of products) {
    await sql`
      INSERT INTO haven_products (id, name, description, price, imageUrl, category, sellerId)
      VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.category}, ${product.sellerId})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedReviews(sql: postgres.Sql) {
  await sql`
    CREATE TABLE haven_reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      sellerId UUID NOT NULL REFERENCES haven_users(id) ON DELETE CASCADE,
      productId UUID NOT NULL REFERENCES haven_products(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
    );
  `;

  for (const review of reviews) {
    await sql`
      INSERT INTO haven_reviews (id, sellerId, productId, content, rating)
      VALUES (${review.id}, ${review.sellerId}, ${review.productId}, ${review.content}, ${review.rating})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await resetDatabase(sql);     
      await seedUsers(sql);       
      await seedProducts(sql);     
      await seedReviews(sql);   
    });

    return Response.json({ message: 'Handcraft DB seeded successfully' });
  } catch (error:any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

