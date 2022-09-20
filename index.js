import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const whiteList = [process.env.ORIGIN1]; //ORIGIN2...3...4...
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado");
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Online: http://localhost:${PORT}/`);
});
