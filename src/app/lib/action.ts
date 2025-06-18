'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { addReview as addReviewToDb } from './data';

export async function addReview(reviewData: {
  productId: string;
  sellerId: string;
  reviewerId: string;
  content: string;
  rating: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required fields
    if (!reviewData.reviewerId) {
      return { success: false, error: 'User ID is required' };
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' };
    }

    if (!reviewData.content || reviewData.content.trim().length < 10) {
      return { success: false, error: 'Review must be at least 10 characters' };
    }

    // Convert to the format expected by the data layer
    const reviewForDb = {
      productId: reviewData.productId,
      sellerId: reviewData.reviewerId,
      content: reviewData.content,
      rating: reviewData.rating
    };

    await addReviewToDb(reviewForDb);
    revalidatePath(`/dashboard/products/${reviewData.productId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to add review:', error);
    return { success: false, error: 'Failed to submit review' };
  }
}