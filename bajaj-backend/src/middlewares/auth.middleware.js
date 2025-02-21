import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		const decodedUser = JWT.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decodedUser._doc._id).select("-password");

		if (!user) return res.status(403).json({ message: "Invalid token" });
		req.user = user;
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ message: error?.message || "Something went wrong" });
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") next();
	else return res.status(403).json({ message: "Admin access required" });
};

export default verifyJWT;
