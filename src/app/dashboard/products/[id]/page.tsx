// src/app/dashboard/products/[id]/page.tsx
import { getProductById, getReviewsByProductId } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
import ReviewForm from '@/app/ui/reviewForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  try {
    // Fetch data in parallel
    const [product, reviews] = await Promise.all([
      getProductById(params.id),
      getReviewsByProductId(params.id),
    ]);

    if (!product) {
      notFound();
    }

    return (
      <div className="max-w-2xl mx-auto p-4">
        {/* Product Image */}
        <div className="mb-6">
          {product.imageUrl && (
            <img
               src={`/products/${product.name.split(" ")[product.name.split(" ").length - 1].toLowerCase()}.webp`}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>

        {/* Product Details */}
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-4">${product.price.toFixed(2)}</p>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => {
                const reviewer = users.find((user) => user.id === review.sellerId);
                return (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      {reviewer?.profileImage && (
                        <img
                          src={reviewer.profileImage}
                          alt={reviewer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{reviewer?.name}</p>
                            <div className="flex text-yellow-400">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{review.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Review Form */}
        <ReviewForm productId={product.id} sellerId={product.sellerId} />
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}