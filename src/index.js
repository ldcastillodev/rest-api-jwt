
import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import restaurantRoutes from './routes/restaurant.routes.js'

const PORT = process.env.PORT || 3000



const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(cors())
app.use(restaurantRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  })
