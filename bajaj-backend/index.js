import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/connectDB.js";
import userRouter from "./src/routes/user.route.js";
import verifyJWT from "./src/middlewares/auth.middleware.js";


const app = express();

const PORT = process.env.PORT || 8888;

dotenv.config();
connectDB();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
