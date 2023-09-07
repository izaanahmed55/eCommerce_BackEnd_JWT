const User = require("../model/User.model");
const { verifyRefreshToken } = require("../services/jwt");

const authenticate = async (req, res, next) => {
    try {
        // Refresh Token Validation
        const { refreshToken } = req.cookies;

        console.log("Refresh: ", req.cookies);

        if (!refreshToken) {
            const error = {
                status: 401,
                message: "Unauthorized. ",
            };

            return next(error);
        }

        let _id;

        try {
            const decodedToken = verifyRefreshToken(refreshToken);
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
