import express,{Express} from "express";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import cors from "cors";
import route from "./routes/route";
import errorHandlingMidleware from "./middlewares/errorHandlingMiddleware";
import CustomError from "./utils/customError";
import envConfig from "./config/env";
import connectDb from "./config/coinnection";

const app:Express= express();
app.use(morgan("dev"))
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api",route);

app.all("*", (req, res, next) => {
    next(new CustomError(`Not found ${req.url}`, 404));
  });
  app.use(errorHandlingMidleware);

const port = envConfig.PORT||3000;
app.listen(port,()=>{
  connectDb();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
