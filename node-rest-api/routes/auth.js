const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// register
router.post("/register", async (req, res) => {
	try {
		// hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// creating new user
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// save user
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
