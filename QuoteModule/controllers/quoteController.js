const { quoteservice } = require('../services')

const { saveQuote } = quoteservice
const { getQuoteInfo } = quoteservice

const saveQuote = async (req, res, next) => {
    try {
        console.log("inside")
        console.log(req.body)
        var quoteInfo = JSON.stringify(req.body);   
        var quoteinfoSaved = await saveQuote(quoteInfo);
        res.send(quoteinfoSaved);
    } catch (e) {
        console.log("error is:" + e);
    }
}


const getQuoteInfo = async (req, res, next) => {
  const { email } = req.body;
  if (email == null ) {
    res.sendStatus(401);
  }
  else {
    try {
      const result = await getQuoteInfo(email);
      console.log("Inside Controller: received response:" + result);
      res.send(result);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


module.exports = {
    saveQuote,
    getQuoteInfo
}
