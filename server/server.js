import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';


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

app.use((err, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: err.message
    })
})


app.listen(ENV.PORT, () => {
    connectDB();
    console.log("Server is running");
})