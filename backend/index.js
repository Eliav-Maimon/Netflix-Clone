import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routers/seedRouter.js';
import userRouter from './routers/userRouter.js';
import contentRouter from './routers/contentRouter.js';
import resetRouter from './routers/resetPwdRouter.js';
import serverless from 'serverless-http';


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

//Routes
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/reset", resetRouter);

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, function () {
            console.log('listening on port ', PORT);
        })
    }).catch(err => {
        console.log(err.message);
    });


export default serverless(app);