const express = require('express')

const { logincontroller, signupcontroller, quoteController } = require('../controllers')

const router = express.Router()

router.use('/login', logincontroller.validateUser)
router.use('/signup', signupcontroller.signupUser)
router.use('/getQuote', quoteController.saveQuote)
router.use('/getQuote', quoteController.getQuoteInfo)

    
module.exports = router
