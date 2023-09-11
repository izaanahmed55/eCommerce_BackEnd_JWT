const express = require('express')
const { userSignUp, userSignIn, isLoggedIn} = require('../controller/User.controller')
const { authenticate } = require('../middleware/authenticate')

const router = express.Router()

router.post('/profile', authenticate, (req, res) => {
    res.json(req.user)
})
router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/isloggedin', isLoggedIn)

module.exports = router;