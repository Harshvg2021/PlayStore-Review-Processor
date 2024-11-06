import Review from '../models/Review.js';
import { pipeline } from '@xenova/transformers';

let classifier = null;

const categories = [
    "Bugs",
    "Complaints",
    "Crashes",
    "Praises",
    "Other"
];

async function initializeClassifier() {
    if (!classifier) {
        classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
    }
}

async function classifyReview(reviewText) {
    try {
        await initializeClassifier();

        const result = await classifier(reviewText, categories, {
            multi_label: false,
            hypothesis_template: "This review is about {}"
        });

        return result.labels[0];
    } catch (error) {
        console.error('Classification error:', error);
        return 'Other';
    }
}

async function classifyReviews(reviewTexts) {
    const results = [];
    for (const text of reviewTexts) {
        const category = await classifyReview(text);
        results.push({ text, category });
    }
    return results;
}

const getReviewsByDateRangeAndCategory = async (date, category) => {
    const endDate = new Date(date);

    if (isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const reviews = await Review.find({
        category: category,
        date: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ date: -1 });

    return {
        reviews,
        dateRange: {
            from: startDate.toISOString().split('T')[0],
            to: endDate.toISOString().split('T')[0]
        }
    };
}

export {
    classifyReview,
    classifyReviews,
    categories,
    getReviewsByDateRangeAndCategory
};