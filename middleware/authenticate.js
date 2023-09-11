const User = require("../model/User.model");
const { verifyAccessToken } = require("../services/jwt");

const authenticate = async (req, res, next) => {
    try {
        // Access Token Validation
        const { accessToken } = req.cookies;

        console.log("Access Token: ", req.cookies);

        if (!accessToken) {
            const error = {
                status: 401,
                message: "Unauthorized.",
            };

            return next(error);
        }

        let _id;

        try {
            const decodedToken = verifyAccessToken(accessToken);
            _id = decodedToken._id;
            console.log(_id)
        } catch (error) {
            return next(error);
        }

        let user;

        try {
            user = await User.findOne({ _id: _id });
            console.log(_id, user);
        } catch (error) {
            return next(error);
        }

        req.user = user;

        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = { authenticate };
