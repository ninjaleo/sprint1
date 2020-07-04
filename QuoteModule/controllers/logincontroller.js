const { loginservice, signupservice } = require('../services')
const { getUserInfo } = loginservice

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
    res.sendStatus(401);
  }
  else {
    try {
      const result = await getUserInfo(email, password);
      console.log("Inside Controller: received response:" + result);
      res.send(result);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}

module.exports = {
  validateUser
}
