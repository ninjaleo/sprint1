const { signupservice } = require('../services')
const { signuputil } = require('../utils')
const { saveUser } = signupservice

const signupUser = async (req, res, next) => {
    try {
        console.log("inside")
        console.log(req.body)
        var signupInfo = JSON.stringify(req.body);
        var signupInfo1 = signuputil.formatSignupInfo(req.body);
        console.log("signupInfo:" + signupInfo1)
        var userinfo = await saveUser(signupInfo1);
        res.send(userinfo);
    } catch (e) {
        console.log("error is:" + e);
    }
}

module.exports = {
    signupUser
}
