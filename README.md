# PlayStore-Review-Processor

A web application for searching and displaying reviews based on date and category. This application scrapes and categorizes reviews from the Google Play Store, allowing users to search reviews by selecting a date within the past 7 days and filtering by categories such as Bugs, Complaints, Crashes, Praises, and Others.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Web Scraper**: google-play-scraper library
- **LLM Classifier** : @xenova/transformers library

---

## Live Demo

You can access the deployed version of this application here: [Live Demo Link](https://play-store-review-processor.vercel.app/)

---

## API Documentation

### 1. **Search Reviews**

- **Endpoint**: `GET /api/reviews/search`
- **Description**: Searches for reviews based on selected date and category.
- **Query Parameters**:
  - `date` - Date in the format `YYYY-MM-DD` (required)
  - `category` - Category of review (required, one of `Bugs`, `Complaints`, `Crashes`, `Praises`, `Other`)
- **Response**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "672b6cfb1868bdeedd5d54a7",
        "content": "How come the game stopped working? I can't login, it's giving error 225.",
        "category": "Bugs",
        "date": "2024-11-04T16:48:26.251Z",
        "__v": 0
      }
    ],
    "dateRange": {
      "from": "2024-10-29",
      "to": "2024-11-05"
    }
  }
