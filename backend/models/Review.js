import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    content: { type: String, required: true },
    category: { type: String, enum: ['Bugs', 'Complaints', 'Crashes', 'Praises', 'Other'] },
    date: { type: Date, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
