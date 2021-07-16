const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("hey it's user");
});

module.exports = router;
