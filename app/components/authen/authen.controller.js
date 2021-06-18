const db = require("../../models/db.config");
const jwt = require("jsonwebtoken");
const User = db.users;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const axios = require("axios");
// const queryString = require("query-string");
const generator = require("generate-password");

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

exports.loginByGoogle = (req, res) => {
  res.redirect("/");
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
  let newPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  await User.update(
    { password: bcrypt.hashSync(newPassword, 8), verified: true },
    { where: { email: req.body.email } }
  );
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
        "<p>Please login your account with new password: <strong>" +
        newPassword +
        "</strong></p></br></br>" +
        "<p>Academy Support</p>",
    };
    transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        return res.send({ code: 404, message: "error" });
      }
      return res.send({
        code: 200,
        message:
          "You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can not find the email.",
      });
    });
  }
};

exports.getUrlGoogle = async (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  const defaultScope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
  res.redirect(url);
};

exports.callback = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // console.log(tokens);
  const googleUser = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    }
  );
  const userWithGoogleId = await User.findOne({
    where: { googleid: googleUser.data.id },
  });
  if (!userWithGoogleId) {
    const userWithEmail = await User.findOne({
      where: { email: googleUser.data.email },
    });
    if (!userWithEmail) {
      await User.create({
        googleid: String(googleUser.data.id),
        username: googleUser.data.name,
        email: googleUser.data.email,
        verified: true,
      });
      const user = await User.findOne({
        where: { googleid: String(googleUser.data.id) },
      });
      const jwtToken = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET
      );
      await User.update(
        { verifyToken: jwtToken },
        { where: { googleid: String(user.googleid) } }
      );
    } else {
      await userWithEmail.update({ googleid: String(googleUser.data.id) });
    }
  } else {
    console.log(userWithGoogleId);
    res.redirect("http://localhost:3001/");
  }
};
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.FACEBOOK_REDIRECT_URL,
//       profileFields: ["email", "name", "id", "displayName"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       await User.create(
//         {
//           facebookid: String(profile.id),
//           username: profile.displayName,
//           email: profile.emails[0].value,
//           verified: true,
//         },
//         function (err, user) {
//           if (err) {
//             return done(err);
//           }
//           done(null, user);
//         }
//       );
//     }
//   )
// );
exports.getUrlFacebook = async (req, res) => {
  const client_id = process.env.FACEBOOK_APP_ID;
  const redirect_uri = process.env.FACEBOOK_REDIRECT_URL;
  // const scope = ["email", "name", "user_birthday", "displayName"].join(","),
  // const stringifiedParams = queryString.stringify({
  //   client_id: process.env.FACEBOOK_APP_ID,
  //   redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
  //   scope: ["email", "name", "user_birthday", "displayName"].join(","),
  //   auth_type: "rerequest",
  // });
  // const facebookLoginUrl = `https://www.facebook.com/v11.0/dialog/oauth?${stringifiedParams}`;
  const facebookLoginUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=public_profile, email, user_likes, user_birthday&auth_type=rerequest`;
  res.redirect(facebookLoginUrl);
};

exports.facebookSuccess = async (req, res) => {
  const code = req.query.code;
  const authUrl = `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`;
  // await axios.get(authUrl).then(async (data) => {
  //   const accessUrl = `https://graph.facebook.com/v11.0/me?fields=id,name,email,birthday&access_token=${data.data.access_token}`;
  //   await axios.get(accessUrl).then((info) => {
  //     console.log(info.data);
  //   });
  // });
  let { data } = await axios.get(authUrl);
  let accessUrl = `https://graph.facebook.com/v11.0/me?fields=id,name,email,birthday&access_token=${data.access_token}`;
  let info = await axios.get(accessUrl);
  const userWithFacebookId = await User.findOne({
    where: { facebookid: info.data.id },
  });
  if (!userWithFacebookId) {
    await User.create({
      facebookid: String(info.data.id),
      username: info.data.name,
      email: info.data.email,
      verified: true,
    });
    const user = await User.findOne({
      where: { facebookid: String(info.data.id) },
    });
    const jwtToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    await User.update(
      { verifyToken: jwtToken },
      { where: { facebookid: String(user.facebookid) } }
    );
  }
  res.send("success");
};
