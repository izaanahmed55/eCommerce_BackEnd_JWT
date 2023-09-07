const express = require('express')
const { userSignUp } = require('../controller/User.controller')
// const { loginValidation } = require('../middleware/LoginValidation')

const router = express.Router()

// router.use(loginValidation)

router.post('/signup', userSignUp)

module.exports = router;