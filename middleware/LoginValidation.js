const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const loginValidation = async (req, res, next) => {
    var token = req.header['authenticate'];

    if (!token) {
        return res.status(401).send({ auth: false, message: "No token Found" });
    }

    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if(err) {
            return res.status(500).send({ auth: false, message: "Invalid Token"})
        }
        req.decoded = decoded;
    })

    next()
};

module.exports = {
    loginValidation,
};