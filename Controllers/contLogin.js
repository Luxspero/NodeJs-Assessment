import modelUser from "../Models/modelUser.js";
import modelAccessToken from "../Models/modelAccessToken.js";
import { createHash, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import ip from "ip";
import nodemailer from "nodemailer";
import { link } from "fs";

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "api",
    pass: "b500e1b21b512b334471161d593fea4c",
  },
});

const login = async (req, res) => {
  let { email, password } = req.body;
  password = createHash("sha256").update(password).digest("hex");
  const user = await modelUser.findOne({ email });
  if (user && user.password === password) {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const newAccessToken = new modelAccessToken({
      id_user: user._id,
      access_token: token,
      ip_address: ip.address(),
    });
    await newAccessToken.save();

    res.json({
      curUser: user._id,
      status: user.status,
      token: token,
      ip_address: ip.address(),
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
};

//Register
const register = async (req, res) => {
  let { name, email, password, role } = req.body;
  const user = await modelUser.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    password = createHash("sha256").update(password).digest("hex");
    const newUser = new modelUser({
      name,
      email,
      password,
      role,
      status: false,
    });
    var save = await newUser.save();
    if (!save) {
      res.status(400).json({ message: "User creation failed" });
    } else {
      //Kirim email verivikasi
      var rand = Math.floor(Math.random() * 100 + 54); //Random 6 digit number
      var host = process.env.HOST + ":" + process.env.PORT;
      var link = host + "/sendlogin/verify?id=" + rand;

      let mailOptions = {
        from: "mailtrap@demomailtrap.com",
        to: email,
        subject: "Verivikasi Akun",
        html: "Hallo, <br> Please klik tautan verifikasi berikut <br>" + link,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          res.json({ status: 400, message: error }).end();
        } else {
          res
            .status(201)
            .json({
              message: "Verification email sent, open your email " + email,
            })
            .end();
        }
      });
    }
  }
};
export { login, register };
