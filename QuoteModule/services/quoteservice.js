const { saveQuoteDetails } = require('../db')
const { retrieveQuoteDetails } = require('../db')

const saveQuote = async (quoteInfo) => {
    try {

        var interestRate = 12.5;
        const quoterequest = {
            "userEmail": quoteInfo.userEmail,
            "annualIncome": quoteInfo.annualIncome,
            "loanAmount": quoteInfo.loanAmount,
            "interestRate": interestRate,
            "tenure": quoteInfo.tenure
        }
        var calculatedEMI = EMIDetails(quoteInfo.loanAmount,interestRate,quoteInfo.tenure);
        const quoterequest = {
            "userEmail": quoteInfo.userEmail,
            "annualIncome": quoteInfo.annualIncome,
            "loanAmount": quoteInfo.loanAmount,
            "interestRate": interestRate,
            "tenure": quoteInfo.tenure,            
            "loanEMI": calculatedEMI.loanEMI,
            "totalAmountPayable": calculatedEMI.totalAmountPayabale,
            "totalInterest": calculatedEMI.totalInterestPayable};
        
        var quoteinfoSaved = await saveQuoteDetails(quoterequest);    
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

const EMIDetails = (principal,rate,tenure) => {

    var interest;   
    var period;
    var result;
    interest = rate / (12*100);
    period  = tenure * 12;
    var emi;
    var totalAmountPayabale;
    var totalInterestPayable;
    emi = (principal * interest *  Math.pow(1+ interest,period)) / (Math.pow(1+interest,period)-1);
    totalAmountPayabale = emi * period;
    totalInterestPayable = totalAmountPayabale - principal;
    result = {
        "loadEMI": emi,
        "totalAmountPayable": totalAmountPayabale,
        "totalInterest": totalInterestPayable};
        return result;
}

module.exports = {
    saveQuote,
    getQuoteInfo
}