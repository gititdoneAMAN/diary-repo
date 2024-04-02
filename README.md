# Fullstack Diary Project

This project is a fullstack diary application built using JavaScript, HTML, and CSS for the frontend, MongoDB as the database, Express.js for the backend server,jwt for authorization and authentication, and Zod for input validation.

## Features

- **User Authentication:** Users can sign up and sign in to access their diary.
- **Diary Pages:** Users can add new pages to their diary.
- **Delete Pages:** Users can delete existing pages from their diary.
- **Exclusive:** Only one page can be added on any date.
- **Exclusive:** Once the day is over , editing is not allowed ,only viewing.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Express.js
- **Database:** MongoDB
- **Input Validation:** Zod
- **Authorization:** JsonWebTokens(jwt)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project>
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

4. Set up the MongoDB database:

   - Install MongoDB if you haven't already.
   - Create a new MongoDB database and note down the connection URI.

5. Start the backend server:

   ```bash
   # From the backend directory
   npm start
   ```

6. Start the frontend:

   ```bash
   # From the frontend directory
   move to each individual page and host it on the local machine
   ```

## Usage

- Sign up or sign in to access the diary.
- Add new pages to the diary by providing page content.
- Delete existing pages from the diary.
- Read the pages

## Acknowledgements

- This project was inspired by the need for a simple and customizable diary application.
- Special thanks to the developers of Express.js, MongoDB, and Zod for their amazing libraries and tools.
