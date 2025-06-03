import { fetchSellerWithProducts } from "@/app/lib/data";
interface SellerPageProps {
  params: { id: string };
}

export default async function Page({ params }: SellerPageProps) {
  const seller = await fetchSellerWithProducts(params.id);

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-2xl p-4 text-center">
        <img
          src={`/users/${seller!.name.split(" ")[0].toLowerCase()}.webp`}
          alt={seller!.name}
          className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
        />
        <h2 className="text-2xl font-semibold">{seller!.name}</h2>
        <p className="text-gray-600">{seller!.email}</p>
        {seller!.bio && <p className="text-sm text-gray-500 mt-2">{seller!.bio}</p>}
        {seller!.phone && <p className="text-sm text-gray-500 mt-2">{seller!.phone}</p>}
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seller!.products.map((product) => (
          <div key={product.id} className="bg-tertiary2 shadow rounded-lg p-4">
             <img
              src={`/products/${product.name.split(" ")[product.name.split(" ").length - 1].toLowerCase()}.webp`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm font-medium mt-2">${product.price}</p>

          </div>
        ))}
      </div>
    </div>
  );
}
