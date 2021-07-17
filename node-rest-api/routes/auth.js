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
		res.status(500).json({ err });
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			res.status(400).json({ message: "incorrect username or password" });
			return;
		}

		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isValidPassword) {
			res.status(400).json({ message: "incorrect username or password" });
			return;
		}

		res.status(200).json({ loggedIn: true, user });
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
