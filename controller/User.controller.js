const User = require("../model/User.model");

const userSignUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailInUse = await User.exists({ email });

        const usernameInUse = await User.exists({ username });

        if (emailInUse) {
            const error = {
                status: 409,
                message: "Email already registered, use another email!",
            };
        }

        if (usernameInUse) {
            const error = {
                status: 409,
                message: "Username not available, choose another username!",
            };
        }
    } catch (error) {
        return next(error);
    }

    try {
        await User.create({
            username,
            email,
            password,
        });
    } catch (error) {
        const err = error;
        res.status(400).send(err);
    }

    return res.send("User Created");
};

module.exports = {
    userSignUp,
};
