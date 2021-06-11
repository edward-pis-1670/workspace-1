const db = require("../../models/db.config");
const jwt = require("jsonwebtoken");
const User = db.users;
const Course = db.courses;
const Notification = db.notifications;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER_SERVER_EMAIL,
    pass: process.env.PASSWORD_SERVER_EMAIL,
  },
});
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const isDupplicateEmail = await User.findOne({ where: { email } });

  if (isDupplicateEmail) {
    return res.json("User with email is already registered");
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = User.build({
    username: username,
    email: email,
    password: hashedPassword,
  });
  const jwtToken = jwt.sign(
    { _id: newUser._id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET
  );
  newUser.verifyToken = jwtToken;
  await newUser
    .save()
    .then(() => {
      let mainOptions = {
        from: "Academy",
        to: email,
        subject: "Verify your account",
        text: "You recieved message from Academy",
        html:
          "<p>Dear " +
          username +
          ",</p></br>" +
          "<p>You have selected " +
          email +
          " as your new Academy account. To verify this email address belongs to you, click the link below and then sign in using your email and password.</p></br>" +
          '<a href="http://localhost:5000/auth/verify/' +
          jwtToken +
          '">Verify now ></a></br></br>' +
          "<p>Academy Support</p>",
      };
      transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(info.response);
      });
    })
    .catch((err) => res.json(err));

  res.json({ message: "Register successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ where: { email } });

  if (!userWithEmail) {
    return res.json("Not match email or password");
  } else if (userWithEmail.verified == false) {
    return res.json("Cannot login");
  }
  const isPassword = bcrypt.compareSync(password, userWithEmail.password);
  if (!isPassword) {
    return res.json("Password is incorrect");
  }
  const jwtToken = jwt.sign(
    {
      _id: userWithEmail._id,
      email: userWithEmail.email,
      role: userWithEmail.role,
    },
    process.env.JWT_SECRET
  );
  await User.update(
    { verifyToken: jwtToken },
    { where: { _id: userWithEmail._id } }
  );
  res.send({
    code: 200,
    token: jwtToken,
    user: userWithEmail,
  });
};

exports.verifyAccount = async (req, res) => {
  const account = await User.findOne({
    where: { verifyToken: req.params.jwtToken },
  });
  account.verified = true;
  await account
    .save()
    .then(() => {
      res.json("Success");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  req.logout();
  res.send({ code: 200 });
};

exports.forgotPassword = async (req, res, next) => {
  const account = await User.findOne({ where: { email: req.body.email } });
  if (account.verified == true) {
    let mainOptions = {
      from: "Academy",
      to: req.body.email,
      subject: "Reset your password",
      text: "You recieved message from Academy",
      html:
        "<p>Dear " +
        account.username +
        ",</p></br>" +
        "<p>A password reset for your account was requested.</p></br>" +
        "<p>Please check your email to reset password: <strong>" +
        "<a href='http://localhost:5000/auth/reset-password/" +
        account.verifyToken +
        "'>Reset password Now ></a>" +
        "</strong></p></br></br>" +
        "<p>Academy Support</p>",
    };
    transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info.response);
    });
  } else {
    res.json("Unauthorize");
  }
  res.json("Please check your email");
};

exports.resetPassword = async (req, res) => {
  const account = await User.findOne({
    where: { verifyToken: req.params.verifyToken },
  });
  if (account) {
    account.password = bcrypt.hashSync(req.body.password, 8);
    account
      .save()
      .then(() => res.json("Change password successfully"))
      .catch((err) => console.log(err));
  }
};
