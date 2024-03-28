const express = require("express");
const { requireAuth, requireAdminAuth } = require("../middleware/requireAuth");

// controller functions
const {
  loginUser,
  signupUser,
  deleteUser,
  updateUser,
  GetUsers,
  changeUserPass,
  resetAdmin,
} = require("../controllers/userController");

const router = express.Router();

//check user token
const checkUserToken = async (req, res) => {
  res.status(200).json({ success: "valid user token" });
};
const checkAdminToken = async (req, res) => {
  res.status(200).json({ success: "valid admin token " });
};
router.get("/isUser", requireAuth, checkUserToken);
router.get("/isAdmin", requireAdminAuth, checkAdminToken);

// login route
router.post("/login", loginUser);

// signup route
router.get("/", requireAdminAuth, GetUsers);
router.post("/signup",signupUser);
router.post("/signup", requireAdminAuth, signupUser);

router.delete("/:email", requireAdminAuth, deleteUser);
router.put("/:email", requireAdminAuth, updateUser);
router.post("/changepass", requireAuth, changeUserPass);
router.post("/resetAdmin", resetAdmin);


module.exports = router;
