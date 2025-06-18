'use client';

import { useState } from 'react';
import { addReview } from '@/src/app/lib/action';

export default function ReviewForm({ productId, sellerId }: { 
  productId: string;
  sellerId: string;
}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { productId, sellerId, content, rating });
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const result = await addReview({
        productId,
        sellerId,
        reviewerId: '410544b2-4001-4271-9855-fec4b6a6442a', // Gimoh Adams (non-seller user)
        content,
        rating
      });
      
      console.log('Review submission result:', result);
      
      if (result.success) {
        setRating(0);
        setContent('');
        setMessage('Review submitted successfully!');
        // Refresh the page to show the new review
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage(result.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage('An error occurred while submitting the review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Your Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {rating === 0 && (
            <p className="text-sm text-red-500 mt-1">Please select a rating</p>
          )}
        </div>
        
        <div>
          <label htmlFor="review-content" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Share your thoughts about this product..."
            required
            minLength={10}
          />
        </div>
        
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || content.trim().length < 10}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}