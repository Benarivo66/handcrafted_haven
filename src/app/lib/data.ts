import postgres from 'postgres';
import {users, products, reviews} from './placeholder-data';
import {
    SellerField,
    ProductField,
    SellerWithProductsField, 
    ReviewField
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchSellers() {
  try {
    const sellers = await sql<SellerField[]>`
      SELECT
        id,
        name,
        email,
        bio,
        phone,
        profileImage
      FROM haven_users
      WHERE isSeller = true
      ORDER BY name ASC
    `;

    return sellers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sellers.');
  }
}

export async function fetchProducts() {
  try {
    const products = await sql<ProductField[]>`
      SELECT
        id,
        name,
        description,
        price,
        sellerId
      FROM haven_products
      ORDER BY name ASC
    `;

    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}
interface SellerWithProducts extends SellerField {
  products: ProductField[];
}

export async function fetchSellerWithProducts(sellerId: string): Promise<SellerWithProducts | null> {
  try {
    const rows = await sql<SellerWithProductsField[]>`
      SELECT
        u.id AS seller_id,
        u.name AS seller_name,
        u.email AS seller_email,
        u.bio AS seller_bio,
        u.phone AS seller_phone,
        u.profileImage AS seller_profile_image,
        p.id AS product_id,
        p.name AS product_name,
        p.description AS product_description,
        p.price AS product_price
      FROM haven_users u
      LEFT JOIN haven_products p ON u.id = p.sellerId
      WHERE u.id = ${sellerId} AND u.isSeller = true
    `;

    if (rows.length === 0) {
      return null;
    }

    const seller: SellerWithProducts = {
      id: rows[0].seller_id,
      name: rows[0].seller_name,
      email: rows[0].seller_email,
      bio: rows[0].seller_bio,
      phone: rows[0].seller_phone,
      password: rows[0].seller_password,
      profileImage: rows[0].seller_profile_image,
      products: [],
    };

    for (const row of rows) {
      if (row.product_id) {
        seller.products.push({
          id: row.product_id,
          name: row.product_name!,
          description: row.product_description!,
          price: row.product_price!,
          sellerId: seller.id,
        });
      }
    }

    return seller;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch seller with products.');
  }
}


// Get single product by ID
export async function getProductById(id: string): Promise<ProductField | undefined> {
  return products.find(product => product.id === id);
}

// Get reviews for product
export async function getReviewsByProductId(productId: string): Promise<ReviewField[]> {
  return reviews.filter(review => review.productId === productId);
}

// Add new review
export async function addReview(reviewData: Omit<ReviewField, 'id' | 'createdAt'>): Promise<ReviewField> {
  const newReview: ReviewField = {
    id: `rev_${Date.now()}`, // Simple unique ID
    ...reviewData,
  };
  
  // In a real app, you would save to database here
  // For now, we'll just push to the placeholder array
  reviews.push(newReview);
  
  return newReview;
}

// Get seller by ID
export async function getSellerById(id: string) {
  return users.find(user => user.id === id);
}

export async function getProductsWithRatings(): Promise<
  Array<ProductField & { averageRating?: number }>
> {
  return products.map(product => {
    const productReviews = reviews.filter(r => r.productId === product.id);
    const averageRating = productReviews.length > 0 
      ? Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1))
      : undefined;
    return { ...product, averageRating };
  });
}