const { quoteservice } = require('../services')
const url = require('url');
const Express = require("express");

const { saveQuote } = quoteservice;

const { getQuoteInfo } = quoteservice;


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

  
 // const { email } = req;

  var queryparams = url.parse(req.url, true).query;
  email = queryparams.userEmail;

  console.log("Inside the Controller : the mail ID passed is "+email);

  if (email == null) {
    res.sendStatus(401);
  }
  else {
    try {
      console.log("Inside the Controller : the mail ID passed is"+email);
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
