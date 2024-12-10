const router = require("express").Router();
const User = require("../modules/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Signin by api
router.post("/signin", async (req, res) => {
  try {
    const { email, username } = req.body;
    const userExist = await User.findOne({ username: username });
    const emailExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be at least 4 characters long" });
    }
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userExist._id, username: userExist.username },
      "tcmTM",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ id: userExist._id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
