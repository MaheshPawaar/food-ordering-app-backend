import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import myUserRoute from './routes/MyUserRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log(`Connected to Database...✅`);
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'Health OK!' });
});

app.use('/api/my/user', myUserRoute);

app.listen(3000, () => {
  console.log(`Server is running at port 3000...🚀`);
});
