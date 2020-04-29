const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const courses = [
    {id: 1, name:'JavaScript'},
    {id: 2, name:'Docker'},
    {id: 3, name:'Kubernetes'},
];


app.get('/', (req,res) =>{
    res.send('helloworld');
    });

app.get('/ninja', (req,res) =>{
    res.send([1,2,3,4,5,6,7]);
});

//get all courses


//routers using req array
app.get('/ninja/courses/all', (req,res) =>{
    res.send(courses);
})

/*
//routers using req
app.get('/ninja/course/:id', (req,res) =>{
    res.send(req.params.id);
})

*/
/*
//routers using req parameters
app.get('/ninja/post/:year/:month/:date', (req,res) =>{
    res.send(req.params);
})
*/

//routers using req query string
app.get('/ninja/post/:year/:month', (req,res) =>{
    res.send(req.query);
})



app.get('/ninja/course/:id', (req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
if (!course) res.status(404).send('The course with given id is not available');
res.send(course);
})
/*
//app.listen(3000, () => console.log('listening'));

app.post('/ninja/api/courses', (req,res) => {

const course = {
    id: courses.length + 1,
    name: req.body.name
};
courses.push(course);
res.send(course);
})
*/
/*
 //input validation for the courses with no course name or course name less than 3 characters
 app.post('/ninja/api/courses', (req,res) => {
    if(!req.body.name || req.body.name.length < 3){
res.status(400).send('Name cannot be blank and should be minimum 3 characters')
 return;    
}
const course = {
    id: courses.length + 1,
    name: req.body.name
};
courses.push(course);
res.send(course);
}) 
*/

/*
 //Using JOI input validation for the courses with no course name or course name less than 3 characters
 app.post('/ninja/api/courses', (req,res) => {
     const schema = {
         name: Joi.string().min(3).required()
     };

     const result = Joi.validate(req.body, schema);
     console.log(result);

    if(!req.body.name || req.body.name.length < 3){
res.status(400).send('Name cannot be blank and should be minimum 3 characters')
 return;    
}
const course = {
    id: courses.length + 1,
    name: req.body.name
};

courses.push(course);
res.send(course);
}) 

*/

/*
 //Using JOI input validation for the courses with no course name or course name less than 3 characters
 // and changing error message using joi's error

 app.post('/ninja/api/courses', (req,res) => {
     const schema = {
         name: Joi.string().min(3).required()
     };

     const result = Joi.validate(req.body, schema);
      if(result.error){
res.status(400).send(result.error);
 return;    
}
const course = {
    id: courses.length + 1,
    name: req.body.name
};

courses.push(course);
res.send(course);
})

*/
/*
 //Using JOI input validation for the courses with no course name or course name less than 3 characters
 // and changing error message using joi's error only what is needed and removing full details.

 app.post('/ninja/api/courses', (req,res) => {
     const schema = {
         name: Joi.string().min(3).required()
     };

     const result = Joi.validate(req.body, schema);
      if(result.error){
res.status(400).send(result.error.details[0].message);
 return;    
}
const course = {
    id: courses.length + 1,
    name: req.body.name
};

courses.push(course);
res.send(course);
})

*/

/*
//put Method: 1
app.put('/api/ninja/courses:id', (req, res) => {

//lookup for the course
// if not available or not exist through error 404

//validate
// if not a valid course, return 400  - Bad request

//Update Course
//Return the updated course

}

*/

/*
app.put('/ninja/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id == parseInt(req.params.id));
if (!course) res.status(404).send('The course with given id is not available');
res.send(course);


const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body, schema);
 if(result.error){
res.status(400).send(result.error.details[0].message);
return; 
 }
course.name = req.body.name;
res.send(course);

});

*/


//replaced 400 error with function


app.put('/ninja/course/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given id is not available');
    //res.send(course);

    //object destructing feature in java script
    const { error } = ValidateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);

});

app.get('/user/html', (req,res) => {

    var msg = [
      "<h1> Hi Ninja Warriors</h1>",
      "<p> Welcome to express session</p>",
      "<b> thanks</b>"
    ].join("");
    res.send(msg);
  });

//function to reuse the validation

function ValidateCourse(course)
{

    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);

}



//delete method

app.delete('/api/course/:id', (req, res) =>{

// look up for the course
// not existing, return 404

//delete
const index = courses.indexOf(course);
courses.splice(index, 1);

//return the same course
res.send(course);
});


const port =  process.env.PORT || 3000
app.listen(port,  () => console.log(`listening on port: ${port}`));
