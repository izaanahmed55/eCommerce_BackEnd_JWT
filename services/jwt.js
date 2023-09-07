const jwt = require("jsonwebtoken");

const key = process.env.SECRET_KEY;

const signAccessToken = (payload, expiryTime) => {
    return jwt.sign(payload, key, { expiresIn: expiryTime });
};

const signRefreshToken = (payload, expiryTime) => {
    return jwt.sign(payload, key, { expiresIn: expiryTime });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, key);
};
const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, key);
        return decoded;
    } catch (error) {
        // Handle token verification error
        throw error;
    }
};

// Store token to DB

// export async function storeRefreshToken(token, userId) {
//    try {
//       const newToken = new RefreshToken({
//          token: token,
//          userId: userId,
//       });

//       // store in db
//       await newToken.save();
//    } catch (error) {
//       console.log(error);
//    }
// }

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
