const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).send({ message: "User Fetched", data: users });
  } catch (error) {
    res.status(500).send({ message: "error", error: error });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send({ message: "user not found" });
    }
    const user = await User.findByIdAndUpdate(id, reqBody, { new: true });
    res.status(202).send({ message: "User Updated", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error" });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, contactNumber } = req.body;
  // console.log(req.file)
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ message: "user already exists" });
    }

    const userImage = req.file.path;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      contactNumber: contactNumber,
      status: true,
      role: "user",
      userImage: userImage,
    });

    await user.save();
    return res.status(201).send({ message: "User Created", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "error", error: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Api", req.body);

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user.status) {
      return res
        .status(401)
        .send({ message: "Account Deactivated! Please contact Admin" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    console.log('accessToken', process.env.MONGODB_URI);
    const token = jwt.sign(
      {
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
        email: user.email,
        userImage: user.userImage,
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
    res.status(200).send({
      message: "User LoggedIn",
      data: user,
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error" });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { email } = req.params.id;
    const { password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;

    await existingUser.save();
    res
      .status(202)
      .send({ message: "Data has been updated", data: existingUser });
  } catch (error) {
    return res.status(500).send({ message: "error", error: error });
  }
};

// Nodemailer configuration
exports.sendSuccessCheckoutEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

  

    // Send OTP via email 
    const mailOptions = {
      from: 'test@ecommerce.com',
      to: email,
      subject: 'Checkout Successfull',
      text: `Cart Has been been Checkout Successfully !!`,
    };

     transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'Checkout Successfull !' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};