const { saveQuoteDetails } = require('../db')
const { retrieveQuoteDetails } = require('../db')
const { quoteutil } = require('../utils')

const saveQuote = async (quoteInfo) => {
    try {
        console.log("Inside Service:"+JSON.stringify(quoteInfo));
        var interestRate = 12.5;
        var calculateQuoteInfo = quoteutil.calculatedQuoteInfo(quoteInfo,interestRate);
        var quoteinfoSaved = await saveQuoteDetails(calculateQuoteInfo);    
        return quoteinfoSaved;
    } catch (e) {
        console.log("Error:" + e.message)
        throw new Error(e);

    }
}

const getQuoteInfo = async (email) => {
  try {
    var result = await retrieveQuoteDetails(email)
    console.log("result:" + result);
    return result;
  } catch (e) {
    throw new Error(e.message)
  }
}


module.exports = {
    saveQuote,
    getQuoteInfo
}