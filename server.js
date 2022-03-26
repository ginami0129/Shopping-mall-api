import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectedDB from "./config/database.js";

import productRoute from "./routes/productRoute.js";
import orderRoute  from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

connectedDB();

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))




app.get('/', (req, res) => {
  res.json({
      msg: "Hello ,World!"
  })
})

// Route
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/users", userRoute)


// Error Handler
// app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 7070;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
