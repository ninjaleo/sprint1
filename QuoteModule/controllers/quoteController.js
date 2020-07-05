const { quoteservice } = require('../services')

const { saveQuote } = quoteservice;

const saveQuoteRequest = async (req, res, next) => {
  try {
    console.log("Inside Controller:")
    var quoteinfoSaved = await saveQuote(req.body);
    res.send(quoteinfoSaved);
  } catch (e) {
    console.log("error is:" + e);
  }
}


const getQuotes = async (req, res, next) => {
  const { email } = req.body;
  if (email == null) {
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
  saveQuoteRequest,
  getQuotes
}
