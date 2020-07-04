const { retrieveUserLoginDetails } = require('../db')

const getUserInfo = async (email, password) => {
  try {
    var result = await retrieveUserLoginDetails(email, password)
    console.log("result:" + result);
    return result;
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  getUserInfo
}