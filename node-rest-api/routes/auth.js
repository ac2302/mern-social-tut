const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("hey it's auth");
});

module.exports = router;
