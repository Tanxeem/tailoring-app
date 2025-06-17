import express from 'express';

import connectDB from './config/dbConfig.js';
import { ALLOW_ORIGINS, PORT } from './config/serverConfig.js';
import cors from 'cors';
import userRoutes from './routes/user.routes.js'
import cookiesparser from 'cookie-parser'
import adminRoutes from './routes/admin.routes.js';


const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookiesparser());

const developmentOrigins = ['http://localhost:5173'];
const productionOrigins = ALLOW_ORIGINS;

const allowedOrigins = [
  ...developmentOrigins,
  ...productionOrigins
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Added OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// router

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)


app.get('/ping', (req, res) => {
  return res.status(200).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
