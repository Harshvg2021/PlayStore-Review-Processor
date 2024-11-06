import gplay from "google-play-scraper";
import Review from '../models/Review.js';
import { classifyReview } from "./reviewService.js";

// Helper function to check if date is within last 7 days
function isWithinLast7Days(date) {
    const reviewDate = new Date(date);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return reviewDate >= sevenDaysAgo && reviewDate <= today;
}

// Function to scrape and save reviews
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
                // Check for existing review
                const existingReview = await Review.findOne({
                    content: reviewData.text,
                    date: new Date(reviewData.date).toISOString().split('T')[0]
                });

                if (!existingReview) {
                    // Classify the review
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

// Function to get reviews from database with filters
async function getReviewsFromDB(startDate, endDate, category = null) {
    try {
        const query = {
            date: {
                $gte: startDate,
                $lte: endDate
            }
        };

        if (category) {
            query.category = category;
        }

        const reviews = await Review.find(query).sort({ date: -1 });
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews from DB:', error);
        throw error;
    }
}

export {
    scrapeAndSaveReviews,
    getReviewsFromDB,
    isWithinLast7Days
};