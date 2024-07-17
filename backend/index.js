
import dotenv from "dotenv";
import path from "path"
import cookieParser from "cookie-parser";
import express from "express"
import connectdb from "./config/db.js";
import router from "./routes/userRoutes.js";
import category from "./routes/categoryRoutes.js";
import product from "./routes/productRoutes.js";
import uploads from "./routes/uploadsRoutes.js";
import orders from "./routes/orderRoutes.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', router);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/uploads', uploads);
app.use("/api/orders", orders);

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname + "/uploads")));

app.listen(port, () => {
    console.log("Server running...");
})
