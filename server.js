import express, {Router} from "express"
import morgan from "morgan"
import cors from "cors"

import productRoute from "./routes/productRoute.js";
import orderRoute  from "./routes/orderRoute.js";

const app = express();


// middleware
app.use(cors())
app.use(morgan('dev'))




app.get('/', (req, res) => {
  res.json({
      msg: "Hello ,World!"
  })
})

// Route
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)


const PORT = 8080;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
