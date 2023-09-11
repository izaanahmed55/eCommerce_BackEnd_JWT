const User = require("../model/User.model");
const { signAccessToken } = require("../services/jwt");

const userSignUp = async (req, res, next) => {
    const { username, email, password} = req.body;

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

        const accessToken = signAccessToken({ _id: user._id }, "1m");

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

        const accessToken = signAccessToken({ _id: user._id }, "1m");

        console.log('user: ', user)

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        return res.status(201).json({ user: user, auth: true });

    } catch (error) {
        return next(error);
    }

};

module.exports = {
    userSignUp, 
    userSignIn,
};
