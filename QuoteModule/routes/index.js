const express = require('express')

const { logincontroller, signupcontroller, quoteController } = require('../controllers')

const router = express.Router()

router.use('/login', logincontroller.validateUser)
router.use('/signup', signupcontroller.signupUser)
router.use('/createQuote', quoteController.saveQuoteRequest)
router.use('/getQuotes', quoteController.getQuotes)

    
module.exports = router
