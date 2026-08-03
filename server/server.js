import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { connectRedis } from './config/redis.js';


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());



app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is healthy"
    });

})

app.use('/api', routes);

// 404 handler - runs when no route above matched the request.
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global exception handler - catches any error that a controller didn't already
// handle, and always replies with the same clean { success, message } shape.
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
})


app.listen(ENV.PORT, () => {
    connectRedis();
    connectDB();
    console.log("Server is running");
})