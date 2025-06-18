// import { fetchProducts } from "@/app/lib/data";
// import Link from "next/link";

// export default async function Page() {
//   const products = await fetchProducts();
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {products.map((product) => (
//         <Link
//               key={product.id}
//               className="bg-white shadow-md rounded-2xl p-4 flex flex-col" href={""}        >
//             <img
//               src={`/products/${product.name.split(" ")[product.name.split(" ").length - 1].toLowerCase()}.webp`}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//           <h2 className="text-xl font-semibold">{product.name}</h2>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <p className="text-lg font-bold text-green-700 mt-4">${product.price}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }

// src/app/dashboard/products/page.tsx
import Link from 'next/link';
import { getProductsWithRatings } from '@/src/app/lib/data';
import { reviews } from '@/src/app/lib/placeholder-data';

export default async function ProductsPage() {
  const products = await getProductsWithRatings();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/dashboard/products/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow" 
          >
            <div className="h-40 bg-gray-100 rounded-md mb-3 overflow-hidden">
              <img 
                src={`/products/${product.name.split(" ")[product.name.split(" ").length - 1].toLowerCase()}.webp`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            
            {product.averageRating && (
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.round(product.averageRating))}
                  {'☆'.repeat(5 - Math.round(product.averageRating))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.averageRating} ({reviews.filter(r => r.productId === product.id).length})
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}