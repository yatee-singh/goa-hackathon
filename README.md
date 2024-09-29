

# This is our submission for the Goa Police Hackathon 2024

A smart parking application that provides you real time parking spot vacancies in Goa, along with the ability to book parking spaces using a ticket system.

## Table of Contents


- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- MongoDB installed and running (if using a local instance) or access to a MongoDB server

## Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure your MongoDB connection**:
   - Open the `index.js` file and update the MongoDB connection string with your credentials.

5. **Run the backend server**:
   ```bash
   node index.js
   ```
   The backend server should now be running on [http://localhost:3000](http://localhost:3000).

## Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend application**:
   ```bash
   npm run dev
   ```
   This will start the frontend server, usually accessible at [http://localhost:5173](http://localhost:5173).

## Running the Application

Once both the backend and frontend are running, you can access the application through your web browser.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


