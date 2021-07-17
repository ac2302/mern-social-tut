const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			max: 256,
			default: "Hey there! I am using mern-stack-social-media-application-tutorial"
		},
		city: {
			type: String,
			max: 16,
			default: ""
		},
		from: {
			type: String,
			max: 16,
			default: ""
		},
		relationship: {
			type: Number,
			enum: [0, 1, 2, 3],
			default: 0
			// 0 = NA
			// 1 = single
			// 2 = in relationship
			// 3 = it's complicated
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
