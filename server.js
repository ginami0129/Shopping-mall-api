import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectedDB from "./config/database.js";
import swaggerUi from "swagger-ui-express";

import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import swaggerJSON from "./config/swagger/index.json" assert { type: "json" };

dotenv.config();

const app = express();

connectedDB();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  /*
  #swagger.responses[200] = {
    schema: {
      msg: "E-commerce API is started at 8080",
    }
  } 
  */
  res.json({
    msg: `E-commerce API is started at ${PORT}`,
  });
});

// Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);

// Error Handler
// app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
