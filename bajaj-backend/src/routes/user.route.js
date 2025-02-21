import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/health", (req, res) => {
	const originalRoute = req.originalUrl;
	return res.send(`route "${originalRoute}" is healthy `);
});
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", verifyJWT, getUserProfile);
userRouter.put("/logout", verifyJWT, logoutUser);

export default userRouter;
