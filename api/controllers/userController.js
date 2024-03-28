require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/user");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, `${process.env.SECRET}`, { expiresIn: "3d" });
  return token;
};
// get all users
const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      username: user.name,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    // create a token
    const token=createToken(user._id)
     res.status(200).json({email,token})
    res.status(200).json({ success: "User Created Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params; // Assuming userId is passed as a URL parameter
  console.log(email);
  try {
    const adminUser = await User.findOne({ email }); // Change to the actual admin email
    console.log(adminUser, " >> admin");
    if (adminUser && adminUser.isAdmin) {
      return res.status(400).json({ error: "Admin user cannot be deleted." });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params; // Assuming userId is passed as a URL parameter
  const updateData = req.body;
  console.log(updateData, email);
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updateData.password = hashedPassword;
  }
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeUserPass = async (req, res) => {
  const { email, oldPass, newPass } = req.body; // Assuming userId is passed as a URL parameter
  const authUser = req.user;
  if (!email || !oldPass || ! newPass){
    return res.status(400).json({ error: "Bad Request" });

  }
  if (!authUser) {
    return res.status(403).json({ error: "unauthorized" });
  }
  console.log("here:",authUser,email)
  if (String(authUser.email) !== String(email)){
    return res.status(403).json({ error: "unauthorized" });
  }

  try {
    const user = await User.login(email, oldPass);
  }
  catch{
    return res.status(403).json({ error: "Mot de passe incorrect" });
  }

  let hashedPass
  if (newPass) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    hashedPass = hashedPassword;
  }
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, {password:hashedPass}, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({success:"Password Changed successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  GetUsers,
  deleteUser,
  updateUser,
  changeUserPass,
  resetAdmin,
};
