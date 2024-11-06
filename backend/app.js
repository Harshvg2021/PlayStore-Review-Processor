import express from 'express'
import db from './database/db.js'
import cron from 'node-cron'
import {scrapeAndSaveReviews} from './services/scrapper.js';
import Review from './models/Review.js';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviewRoutes.js';
import cors from 'cors';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
}));


cron.schedule('0 0 * * *', () => {
    console.log('Running daily review scraper...');
    scrapeAndSaveReviews();
});

app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
