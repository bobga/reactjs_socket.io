# Real-time Data Visualization with React.js and Socket.IO

This project demonstrates a real-time data visualization application built with React.js and Socket.IO. It features a dynamic chart that updates in real-time based on data from a MySQL database.

## Features

- Real-time data visualization using charts
- WebSocket communication between client and server using Socket.IO
- MySQL database integration for data persistence
- Automatic data updates every 10 seconds
- User connection tracking
- Modern React.js frontend with responsive design

## Technologies Used

- Frontend:
  - React.js
  - Socket.IO Client
  - Chart.js (for data visualization)
- Backend:
  - Node.js
  - Express.js
  - Socket.IO Server
  - MySQL/MariaDB

## Prerequisites

- Node.js (v12 or higher)
- MySQL/MariaDB server
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bobga/reactjs_socket.io.git
cd reactjs_socket.io
```

2. Set up the database:
   - Create a MySQL database named 'chart'
   - Import the database schema from `db.sql`
   - Update database credentials in `NodeSever/server.js` if needed

3. Install server dependencies:
```bash
cd NodeSever
npm install
```

4. Install frontend dependencies:
```bash
cd ../ImprovedReactJS
npm install
```

## Running the Application

1. Start the Socket.IO server:
```bash
cd NodeSever
node server.js
```
The server will run on port 8000.

2. In a new terminal, start the React frontend:
```bash
cd ImprovedReactJS
npm start
```
The frontend will be available at http://localhost:3000

## Project Structure

- `NodeSever/` - Backend server code
  - `server.js` - Socket.IO server and database connection
- `ImprovedReactJS/` - Frontend React application
- `db.sql` - Database schema and initial setup

## Data Flow

1. The server connects to MySQL database and Socket.IO
2. Data is periodically fetched from the database (every 10 seconds)
3. Updates are pushed to connected clients via WebSocket
4. The React frontend receives and visualizes the data in real-time

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest enhancements
- Submit pull requests

## License

This project is licensed under the MIT License.
