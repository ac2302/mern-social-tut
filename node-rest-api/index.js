require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

mongoose.connect(
	process.env.DB_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) console.error({ err });
		else console.log("conected to database");
	}
);

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
