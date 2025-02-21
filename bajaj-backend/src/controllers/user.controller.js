import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
// Generate JWT Token
const generateToken = (user) => {
	return jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		// validate the req field
		if (!name || !email || !password) {
			return res
				.status(402)
				.json({ message: "Please provide all the required field" });
		}

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "User already exists" });

		// Create new user
		const user = await User.create({ name, email, password });
		if (user) {
			res.status(201).json({
				message: "User created successfully",
				data: { _id: user.id, name, email },
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	

	try {
		if (!email || !password)
			return res
				.status(402)
				.json({ message: "email and password both required for login" });

		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(404)
				.json({ message: "user not register, please register first" });

		const isCorrectPassword = await user.isCorrectPassword(password);

		if (!isCorrectPassword)
			return res
				.status(401)
				.json({ message: "Invalid email or password or not matched" });

		const accessToken = generateToken(user);
		
		const options = {
			httpOnly: true,
			secure: false,
			sameSite: "lax",  // Prevents CSRF attacks
    		expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
		};

		return res.status(200).cookie("accessToken", accessToken, options).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const logoutUser = async (req, res) => {
	const options = {
		httpOnly: true,
		secure: false,
		sameSite: "lax", 
	};

	//delete cookies from frontend
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.json({ message: "User logged out successfully" });
};

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
