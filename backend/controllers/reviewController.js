import { getReviewsByDateRangeAndCategory } from '../services/reviewService.js';

export const getReviews = async (req, res) => {
    try {
        const { date, category } = req.query;

        // Validate required parameters
        if (!date || !category) {
            return res.status(400).json({
                success: false,
                message: 'Both date and category parameters are required'
            });
        }

        const result = await getReviewsByDateRangeAndCategory(date, category);

        return res.status(200).json({
            success: true,
            count: result.reviews.length,
            data: result.reviews,
            dateRange: result.dateRange
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);

        if (error.message === 'Invalid date format') {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please use YYYY-MM-DD'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
