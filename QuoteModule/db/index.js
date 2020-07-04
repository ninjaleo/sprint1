const { retrieveUserLoginDetails, saveUserDetails } = require('./userdbmodel')
const { retrieveQuoteDetails, saveQuoteDetails } = require('./quotedbmodel')
module.exports = {
  retrieveUserLoginDetails,
  saveUserDetails,
  saveQuoteDetails,
  retrieveQuoteDetails
}