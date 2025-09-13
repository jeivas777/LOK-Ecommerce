const express = require("express");
const user = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, user.getUser);
router.put("/me", protect, user.editUser);

module.exports = router;
