import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './middleware/notFound';
import globalErrorHandle from './middleware/globalErrorHandle';
import { userRouter } from './module/user.router';
import bodyParse from 'body-parser'

const app: Application = express();

app.use(express.json())
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use('/api/users', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello Assignment 2");
});

app.use(notFound)
app.use(globalErrorHandle)

export default app;
