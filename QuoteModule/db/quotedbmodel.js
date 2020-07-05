const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const QuoteSchema = new mongoose.Schema({
  //quoteId: Number ,
  userEmail: String,
  annualIncome: Number,
  principal: Number,
  interestRate: Number,
  tenure: Number,
  monthlyEMI: Number,
  totalInterest: Number,
  totalAmountPayable: Number,
  createdDate:{ type: Date, default: Date.now }
});

QuoteSchema.plugin(AutoIncrement,{inc_field: 'quoteId'})
const quote = mongoose.model("quote", QuoteSchema);

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://ninjaleo:ninjaleo@ninjaleo.slc2s.gcp.mongodb.net/leosales?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


const saveQuoteDetails = async (quoteInfo) => {
    try {
      console.log("Inside DB:" + quoteInfo)
      var quotedoc = new quote(quoteInfo);
      return await quotedoc.save()
        .then(data => {
          console.log("data:" + data);          
          return { data };
        })
        .catch(err => {
          console.log("Error:" + err)
          var errorCode = 0
          var errorMessage = ""
          if (err.code == 11000) {
            errorCode = err.code;
            errorMessage = "Quote not saved."
          }
          else {
            errorCode = err.code;
            errorMessage = err.message;
          }
          return {
            status: "failed",
            code: errorCode,
            message: errorMessage
  
          }
        })
    }
    catch (e) {
      console.log(e);
      throw new error(e);
    }
  
  };
  
  const retrieveQuoteDetails = async (email) => {
    try {
      console.log("Date is:" + Date.now());
      var query = { 'userEmail': email };
      return await quote.find(query)
        .then(
          data => {
            if (data !== null) {
              console.log("Quote details " + data)
              const { username, lastLoginDate } = data;
              const responseData = data;
              return responseData;
            }
            else {
              console.log("Quotes Not Found");
              const responseData = { status: "failed", message: "No quotes submitted yet." }
              return responseData;
            }
          })
        .catch(
          error => {
            console.log("error while retriving the quote info:" + error)
            throw new error(error);
          })
    }
    catch (error) {
      console.log(error);
      throw new error(error);
    }
  
  };

  module.exports = {
    retrieveQuoteDetails,
    saveQuoteDetails
  }
  