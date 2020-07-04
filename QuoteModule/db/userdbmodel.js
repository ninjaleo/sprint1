const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, indexes: true },
  password: String,
  username: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  region: String,
  zip: String,
  country: String,
  registeredDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date }
});

const user = mongoose.model("user", UserSchema);
mongoose.set('useCreateIndex', true);
//mongoose.connect("mongodb+srv://ninjaleo:ninjaleo@ninjaleo-slc2s.gcp.mongodb.net/quote?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://ninjaleo:ninjaleo@ninjaleo.slc2s.gcp.mongodb.net/leosales?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const retrieveUserLoginDetails = async (email, password) => {
  try {
    console.log("Date is:" + Date.now());
    var query = { 'email': email, 'password': password };
    return await user.findOneAndUpdate(query, { 'lastLoginDate': Date.now() }).select({ "username": 1, "lastLoginDate": 1, "_id": 0 })
      .then(
        data => {
          if (data !== null) {
            console.log("user login data is:" + data)
            const { username, lastLoginDate } = data;
            const responseData = { status: "success", username, lastLoginDate }
            return responseData;
          }
          else {
            console.log("User Not Found");
            const responseData = { status: "failed", message: "User Not Found. Please Check Your Credentials and Retry" }
            return responseData;
          }
        })
      .catch(
        error => {
          console.log("error while retriving the user info:" + error)
          throw new error(error);
        })
  }
  catch (error) {
    console.log(error);
    throw new error(error);
  }

};


const saveUserDetails = async (signupInfo) => {
  try {
    console.log("Inside DB:" + signupInfo)
    var userdoc = new user(signupInfo);
    return await userdoc.save()
      .then(data => {
        console.log("data:" + data);
        return { status: "success", message: "Your registration process completed. Please login with your credentails." };
      })
      .catch(err => {
        console.log("Error:" + err)
        var errorCode = 0
        var errorMessage = ""
        if (err.code == 11000) {
          errorCode = err.code;
          errorMessage = "Email already exists. Please use forgot password option incase if you don't remember credentails."
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


module.exports = {
  retrieveUserLoginDetails,
  saveUserDetails
}
