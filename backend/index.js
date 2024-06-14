
import dotenv from "dotenv";
// import path from "path"
import cookieParser from "cookie-parser";
import express from "express"
import connectdb from "./config/db.js";
import router from "./routes/userRoutes.js";
import category from "./routes/categoryRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', router);
app.use('/api/category', category);


app.listen(port, () => {
    console.log("Server running...");
})
