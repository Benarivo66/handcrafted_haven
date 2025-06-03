import { fetchProducts } from "@/app/lib/data";

export default async function Page() {
  const products = await fetchProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col"
        >
            <img
              src={`/products/${product.name.split(" ")[product.name.split(" ").length - 1].toLowerCase()}.webp`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold text-green-700 mt-4">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
