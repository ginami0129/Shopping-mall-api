import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser";
import connectedDB from "./config/database.js";

import productRoute from "./routes/productRoute.js";
import orderRoute  from "./routes/orderRoute.js";

dotenv.config();

const app = express();

connectedDB();

// middleware
app.use(cors())
app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json());
// app.use(express.urlencoded({ extended : true }))



app.get('/', (req, res) => {
  res.json({
      msg: "Hello ,World!"
  })
})

// Route
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)


const PORT = process.env.PORT || 7070;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
