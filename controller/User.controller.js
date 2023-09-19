const User = require("../model/User.model");
const { signAccessToken, verifyAccessToken } = require("../services/jwt");

const userSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const emailInUse = await User.exists({ email });

    const usernameInUse = await User.exists({ username });

    if (emailInUse) {
      const error = {
        status: 409,
        message: "Email already registered, use another email!",
      };

      return next(error);
    }

    if (usernameInUse) {
      const error = {
        status: 409,
        message: "Username not available, choose another username!",
      };

      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    const accessToken = signAccessToken({ _id: user._id }, "10m");

    // send tokens in cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(201).json({ user: user, auth: true });
  } catch (error) {
    const err = error;
    res.status(400).send(err);
  }
};

const userSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = {
        status: 409,
        message: "User not Found!",
      };

      return next(error);
    }

    const accessToken = signAccessToken({ _id: user._id }, "10m");

    // console.log("user: ", user);

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true, // Set to true for HTTPS environments
      sameSite: 'none', // Set to 'none' for cross-site cookies (requires secure)
    });    

    console.log("accessToken set:", accessToken);

    return res.status(201).json({ user: user, auth: true, accessToken });
  } catch (error) {
    return next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    // Access Token Validation
    const { accessToken } = req.cookies;

    console.log("Cookies: ", req.cookies, " 🔰 Access token : ", accessToken);

    if (!accessToken) {
      console.log("Access token Undefined");
      return res.json({ auth: false, isLogin: false });
    }

    let _id;

    try {
      const decodedToken = verifyAccessToken(accessToken);
      _id = decodedToken._id;
      console.log(_id);

      return res.json({ auth: true, isLogin: true });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
const logOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", { maxAge: 0 });
    const { accessToken } = req.cookies;
    console.log("Logout Cookies: ", req.cookies, " 🔰 Access token : ", accessToken);
    res.status(200).json({
      auth: false,
      isLogin: false,
      message: "Access token cookie deleted",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  isLoggedIn,
  logOut,
};
