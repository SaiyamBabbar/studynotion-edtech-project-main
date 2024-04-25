const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

exports.auth = async (req, res, next) => {
	try {
		const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			req.user = decode;
		} catch (error) {
			return res.status(401).json({ success: false, message: "Token is invalid" });
		}

		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: `Something went wrong while validating the token` });
	}
};

exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		if (userDetails.accountType !== "Student") {
			return res.status(401).json({ success: false, message: "This is a protected route for students" });
		}
		next();
	} catch (error) {
		return res.status(500).json({ success: false, message: `User role couldn't be verified` });
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({ success: false, message: "This is a protected route for admin" });
		}
		next();
	} catch (error) {
		return res.status(500).json({ success: false, message: `User role couldn't be verified` });
	}
};

exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({ success: false, message: "This is a protected route for instructor" });
		}
		next();
	} catch (error) {
		return res.status(500).json({ success: false, message: `User role couldn't be verified` });
	}
};
