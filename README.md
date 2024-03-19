# Fullstack Diary Project

This project is a fullstack diary application built using JavaScript, HTML, and CSS for the frontend, MongoDB as the database, Express.js for the backend server, and Zod for input validation.

## Features

- **User Authentication:** Users can sign up and sign in to access their diary.
- **Diary Pages:** Users can add new pages to their diary.
- **Delete Pages:** Users can delete existing pages from their diary.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Express.js
- **Database:** MongoDB
- **Input Validation:** Zod

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
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
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the diary application.

## Usage

- Sign up or sign in to access the diary.
- Add new pages to the diary by providing page content.
- Delete existing pages from the diary.

## Acknowledgements

- This project was inspired by the need for a simple and customizable diary application.
- Special thanks to the developers of Express.js, MongoDB, and Zod for their amazing libraries and tools.
