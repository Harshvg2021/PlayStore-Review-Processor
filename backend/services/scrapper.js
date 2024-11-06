import gplay from "google-play-scraper";
import Review from '../models/Review.js';
import { classifyReview } from "./reviewService.js";

function isWithinLast7Days(date) {
    const reviewDate = new Date(date);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return reviewDate >= sevenDaysAgo && reviewDate <= today;
}

async function scrapeAndSaveReviews(appId = 'com.superplaystudios.dicedreams', limit = 200) {
    try {
        console.log("Starting review scraping...");

        const reviews = await gplay.reviews({
            appId: appId,
            sort: gplay.sort.NEWEST,
            num: limit
        });

        console.log(`Found ${reviews.data.length} reviews to process`);

        const newReviews = [];

        for (const reviewData of reviews.data) {
            if (isWithinLast7Days(reviewData.date)) {
                const existingReview = await Review.findOne({
                    content: reviewData.text,
                    date: new Date(reviewData.date).toISOString().split('T')[0]
                });

                if (!existingReview) {
                    const category = await classifyReview(reviewData.text);

                    const review = new Review({
                        content: reviewData.text,
                        category,
                        date: new Date(reviewData.date)
                    });

                    await review.save();
                    newReviews.push(review);
                    console.log(`Classified and saved review as ${category}`);
                }
            }
        }

        return {
            total: reviews.data.length,
            saved: newReviews.length,
            reviews: newReviews
        };

    } catch (error) {
        console.error('Error in scraping reviews:', error);
        throw error;
    }
}

export {
    scrapeAndSaveReviews,
    isWithinLast7Days
};