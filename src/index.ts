import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import myUserRoute from './routes/MyUserRoute';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import restaurantRoute from './routes/RestaurantRoute';
import orderRoute from './routes/OrderRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log(`Connected to Database...✅`);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' }));
app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'Health OK!' });
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

app.listen(3000, () => {
  console.log(`Server is running at port 3000...🚀`);
});
