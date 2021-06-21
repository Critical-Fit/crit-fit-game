import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config('./config/.env');

app.use(express.json());

// Connect to the Database
// connectDB();

// Route Middleware
// app.use()

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
app.listen(PORT, () => console.log(`Server is running in ${MODE} mode on port ${PORT}`))