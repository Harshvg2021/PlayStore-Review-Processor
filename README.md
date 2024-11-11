# PlayStore-Review-Processor
![image](https://github.com/user-attachments/assets/59136437-120c-49f9-951d-c3686a2cdc15)


A web application for searching and displaying reviews based on date and category. This application scrapes and categorizes reviews from the Google Play Store, allowing users to search reviews by selecting a date within the past 7 days and filtering by categories such as Bugs, Complaints, Crashes, Praises, and Others.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Web Scraper**: google-play-scraper library
- **LLM Classifier** : @xenova/transformers library

---

## Live Demo

(Please Note that the backend deployed server shuts down due to inactivity due to being a free teir service, Please give it a few moments to load the data , in the frist request ) 

(Please Note : Data is available from November 3rd, 2024 onwards )

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

## Running Locally

### Prerequisites

- **Node.js** (version >= 14)
- **MongoDB** (local or cloud instance)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/PlayStore-Review-Processor.git
   cd PlayStore-Review-Processor.git
   ```

2.  **Start the Backend**

    navgiate to backend folder
    ```bash
    cd backend 
    ```

    Pull the Docker image
    ```bash
    docker pull harshvg2021/review-processor:latest
    ```
    Create a .env file in the backend folder with the following content:
    ```bash
    PORT=5000 
    MONGODB_URI=your_mongodb_connection_string
    ```
    Run the container:
    ```bash
    docker run -p 5000:5000 --env-file .env harshvg2021/review-processor:latest
    ```

The backend server should now be running on http://localhost:5000

3. **Start Frontend**

    navgiate to frontend folder
    ```bash
    cd frontend 
    ```

    Install dependencies
    ```bash
    npm install
    ```

    Start the frontend:
    ```bash
    npm start
    ```

    You can now access the frontend running on http://localhost:3000


## Cost Eastimation
### Frontend
-**vercel pro 20$ /pm**

Assumptions : 10000 + visitors

### Backend
-**render pro 7$ /pm**

Assumptions : Daily APi calls  >50000 , concurrent user  > 200
### Database
-**MongoDB M0 cluster 9$ /pm**

Assumptions : 100000+ records, Daily users > 300

### Total Cost = 35$ per month with the above assumption


## Resources Used

- **Scrapping**: npmjs.com , google-play-scraper library 
- **LLM Classification**: [Medium Blog](https://medium.com/@mjdrehman/add-ai-in-your-web-app-in-10-minutes-a-quick-guide-8c26086b0d7d), npmjs.com, @xenova/transformers library 
- **Styling/CSS help for Frontend**:  ChatGPT
