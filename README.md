LPG Gas Distribution System
A full-stack web application for managing LPG gas cylinder inventory, tracking stock movements (incoming, outgoing, sales, returns) for 6KG, 13KG, 35KG, and 50KG cylinders. Features a real-time dashboard with visualizations.
Table of Contents

Features
Tech Stack
Project Structure
Setup Instructions
Prerequisites
Backend Setup
Frontend Setup
MongoDB Setup


Usage
API Endpoints
Deployment
Contributing
License

Features

Stock Management: Record stock movements (incoming, outgoing, sales, returns) for 6KG, 13KG, 35KG, and 50KG cylinders.
Real-Time Dashboard: Visualize stock data with bar charts, summary cards (including current stock), and a history table using Recharts.
Data Persistence: Stores data in MongoDB for reliable inventory tracking.
Responsive Design: Built with Tailwind CSS for a mobile-friendly interface.
Error Handling: Validates inputs and provides clear user feedback.

Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React, React Router, Tailwind CSS, Recharts, Axios
Build Tool: Vite
Development Tools: Nodemon, PostCSS

Project Structure
lpg-gas-distribution/
├── backend/
│   ├── config/              # Database configuration
│   ├── models/              # Mongoose schemas (Stock)
│   ├── routes/              # API routes (stock)
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server entry point
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components (StockInput, Dashboard)
│   │   ├── App.js           # Main React app
│   │   ├── index.js         # React entry point
│   │   └── styles.css       # Tailwind CSS styles
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Tailwind configuration
├── .env                     # Environment variables
└── README.md                # Project documentation

Setup Instructions
Prerequisites

Node.js: v16 or higher
MongoDB: Local installation or MongoDB Atlas account
Git: For cloning the repository
NPM: Comes with Node.js

Backend Setup

Navigate to the backend/ directory:cd backend


Install dependencies:npm install


Create a .env file in the backend/ directory with the following:MONGO_URI=mongodb://localhost:27017/lpg_distribution
PORT=5000


Replace MONGO_URI with your MongoDB connection string (local or Atlas).


Start the backend server:npm start

Or, for development with auto-restart:npm run dev


Verify the server is running at http://localhost:5000.

Frontend Setup

Navigate to the frontend/ directory:cd frontend


Install dependencies:npm install


Start the development server:npm start

The app will be available at http://localhost:5173.
For production, build the app:npm run build

Serve the dist/ folder using a static server (e.g., npx serve dist).

MongoDB Setup

Local MongoDB:
Install MongoDB Community Edition from mongodb.com.
Start the MongoDB server: mongod.
Use the default MONGO_URI: mongodb://localhost:27017/lpg_distribution.


MongoDB Atlas:
Create a free cluster at cloud.mongodb.com.
Get the connection string and update MONGO_URI in the .env file.



Usage

Stock Input (/):
Visit http://localhost:5173/.
Select the movement type (Incoming, Outgoing, Sale, Return), cylinder size (6KG, 13KG, 35KG, 50KG), and enter a positive quantity.
Submit to record the stock movement.


Dashboard (/dashboard):
Navigate to http://localhost:5173/dashboard.
View real-time stock data with a bar chart, summary cards (including current stock), and a history table.



API Endpoints

Stock:
POST /api/stock: Record a stock movement ({ type, size, quantity }).
GET /api/stock: Retrieve all stock movements.
GET /api/stock/summary: Get aggregated stock data.



Example Request:
curl -X POST http://localhost:5000/api/stock -H "Content-Type: application/json" -d '{"type":"incoming","size":"6KG","quantity":10}'

Deployment

Backend:
Deploy to a platform like Render, Heroku, or AWS.
Set environment variables (MONGO_URI, PORT) in the platform’s dashboard.
Example for Render:
Push the backend/ folder to a Git repository.
Create a new Web Service, set the start command to npm start, and add environment variables.




Frontend:
Build the frontend: npm run build in the frontend/ directory.
Deploy the dist/ folder to Vercel, Netlify, or a static hosting service.
Update the API URL in StockInput.js and Dashboard.js to point to your deployed backend URL.


MongoDB: Use MongoDB Atlas for a scalable, cloud-based database.

Contributing

Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Open a pull request.

License
MIT License. See LICENSE for details.
