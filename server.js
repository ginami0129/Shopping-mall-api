import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express();


// middleware
app.use(cors())
app.use(morgan('dev'))




app.get('/', (req, res) => {
  res.json({
      msg: "Hello ,World!"
  })
})



const PORT = 8080;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
