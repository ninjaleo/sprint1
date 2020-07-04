const Express = require("express");
const BodyParser = require("body-parser");
const routes = require('./routes')
const logger = require('./utils/logger');

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', routes)
app.post('/signup', routes)

app.get("/", async (request, response) => {
    try {
        response.send("OK");
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3001, () => {
    logger.info("xpress Application Server");
    console.log("Express Application Server Is Running At Port 3001");
});





/* const EmployeeModel = Mongoose.model("employee", {
    userid: String,
    password: String
});

app.post("/user", async (request, response) => {
    try {
        //console.log(request);
        var employee = new EmployeeModel(request.body);
        var result = await employee.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/", async (request, response) => {
    console.log("Hii")
    try {
        var result = await EmployeeModel.find().exec();
        console.log(result)
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/user", async (request, response) => {
    try {
        console.log(request.body);
        const {userId, password} = request.body;
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
}); */
