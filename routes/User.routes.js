const express = require('express')
const { userSignUp, userSignIn} = require('../controller/User.controller')
const { authenticate } = require('../middleware/authenticate')

const router = express.Router()

router.post('/dashboard', authenticate, (req, res) => {
    res.json(req.user)
})
router.post('/signup', userSignUp)
router.post('/signin', userSignIn)

module.exports = router;