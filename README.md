# Project Title

## Description
A brief description of your project goes here.

## Tech Stack
- **Frontend:** Next.js, React
- **Backend:** NestJS, Mongoose
- **Database:** MongoDB

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- MongoDB (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nosisky/easygen-project.git
   cd easygen-project
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and add the following:
   ```
   DATABASE_URL=your_database_url
   PORT=your_port_number
   ```

4. Navigate to the `backend` directory and install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

5. Navigate to the `frontend` directory and install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```


### Running the Application

1.To Start the both the frontend and backend servers, CD to the parent directory containing both the `backend` and `frontend` directories and run:
   ```bash
   npm run start:dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

