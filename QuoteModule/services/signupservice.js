const { saveUserDetails } = require('../db')

const saveUser = async (signupInfo) => {
    try {
        var userinfo = await saveUserDetails(signupInfo);
        return userinfo;
    } catch (e) {
        console.log("Error:" + e.message)
        throw new Error(e);

    }
}

module.exports = {
    saveUser
}