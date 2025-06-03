export type SellerField = {
    id: string; 
    name: string;
    email: string;
    password: string;
    phone?: string;
    isSeller?: boolean; 
    bio?: string | null;
    profileImage?: string | undefined;
  };
  
  export type ProductField = {
    id: string; 
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    sellerId: string;
    category?: string; 
  };
  
  export type ReviewField = {
    id: string; 
    sellerId: string; 
    productId: string; 
    content: string;
    rating: number; 
  };
  
  export type SellerWithProductsField = {
    seller_id: string;
    seller_name: string;
    seller_email: string;
    seller_password: string;
    seller_bio: string | undefined;
    seller_phone: string | undefined;
    seller_profile_image: string | undefined;
    product_id: string | undefined;
    product_name: string | undefined;
    product_description: string | undefined;
    product_price: number | undefined;
  }
  