const express = require('express');
const router = express.Router();
console.log('Inside routes/index')
var users = [{SID:"s530489",First_Name:"Sai Kumar",Last_Name:"Uppala",Password:"1234567",pic:"img",courses:["C123","C125"]},
             {SID:"s530488",First_Name:"Swaroop",Last_Name:"Aditya",Password:"1234567",pic:"img",courses:["C124","C125"]}];

var faculty = [{FID:"f530489",First_Name:"Case",Last_Name:"Dennis",Password:"1234567",pic:"img",courses:["C123","C125"]},
              {FID:"f530489",First_Name:"Nathan",Last_Name:"Eloe",Password:"1234567",pic:"img",courses: ["C123"]}]


var courses = [{CourseID:"C123",Course_Name:"Java", Timings:"10:30",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall",seats: 20},
               {CourseID:"C124",Course_Name:"Web-apps", Timings:"09:30",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall",seats : 20},
               {CourseID:"C125",Course_Name:"BigData", Timings:"08:00",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall",seats: 25}]
var CurrentID ;
var Student_Courses = [];
var Other_Courses = [];
var Current_user;
var result_Course = null;

var FCurrent_user;
var FIndex;
var Courses_taught = [];
var user = null;
var resultcourses = [];


router.all("/", function (request, response) {
  CurrentID = null ;
  Student_Courses = [];
  Other_Courses = [];
  Current_user = null;
  result_Course = null;
  
  FCurrent_user = null;
  FIndex = null;
  Courses_taught = [];
  user = null;
  resultcourses = [];
  response.render('home.ejs');

});


router.get("/userSignup", function (req, res) {
  res.render("userSignup.ejs");
});

router.get("/userLogin", function (req, res) {
  res.render("userLogin.ejs");
});

router.get("/userHome", function (req, res) {
  res.render("userHome.ejs",{User : Current_user, Courses_Registered : Student_Courses});
});



router.post("/userHome", function (req, res) {
   var username = req.body.username;
   var Password = req.body.password;
   var count = 0;
   Student_Courses = [];
   console.log(username+" "+Password);
   for(i=0; i< users.length;i++){
     if(users[i].SID == username && users[i].Password == Password){
       count +=1;
       CurrentID = users[i].SID;
       Current_user = users[i];
      for(j=0;j<users[i].courses.length;j++){
        for(k=0;k<courses.length;k++){
          if(users[i].courses[j] == courses[k].CourseID){
            Student_Courses.push(courses[k]);
            break;
          }
        }
      }
      var count1;
      for(k=0;k<courses.length;k++){
        count1 = 0;
        for(j=0;j<users[i].courses.length;j++){
          if(courses[k].CourseID == users[i].courses[j] ){
           count1++;
           break;
          }
        }
        if(count1==0){
            Other_Courses.push(courses[k]);
        }
      }
      
      console.log(users[i]);
      console.log(Student_Courses);
      console.log(Other_Courses)
      res.render("userHome.ejs",{User : users[i], Courses_Registered : Student_Courses});
      break;
     } 
   }
   if(count == 0){
     console.log("not a valid user id and password");
   }
 
});

router.get("/userSearch", function (req, res) {
  res.render("userSearch.ejs",{course : result_Course});
});

router.post("/createUser", function (req, res) {

  var new_user = {
    SID: req.body.studentId,
    First_Name: req.body.firstName,
    Last_Name: req.body.lastName,
    Password: req.body.password,
    pic:"img",
    courses:[]
  }
  console.log(new_user);
  users.push(new_user);
  res.render("userLogin.ejs");
});

router.get("/userRegisterDrop", function (req, res) {
  res.render("userRegisterDrop.ejs",{User : Current_user, Courses_Registered : Student_Courses, Courses_Not : Other_Courses});

});

router.get("/userSearchGo", function (req, res) {
  console.log(req.query)
  var Input_Course = req.query.search;
  for(i=0;i<courses.length;i++){
    if(Input_Course == courses[i].CourseID){
      result_Course = courses[i];
    }
  }
  console.log(result_Course)
  if(result_Course != null){
    res.render("userSearch.ejs",{course : result_Course});
  }
  else{
    console.log("no course found");
  }
  result_Course = null;
});

//Admin routes

router.get("/adminSignup", function (req, res) {
  res.render("adminSignup.ejs");
});

router.get("/adminLogin", function (req, res) {
  res.render("adminLogin.ejs");
});
router.get("/adminHome", function (req, res) {
  res.render("adminHome.ejs",{User : FCurrent_user, Courses_teaching : Courses_taught});
});

router.post("/adminHome", function (req, res) {
  var username = req.body.username;
  var Password = req.body.password;
  console.log(username+" "+Password)
  var count = 0;
  for(i=0; i< faculty.length;i++){
    if(faculty[i].FID == username && faculty[i].Password == Password){
      count++;
      FCurrent_user = faculty[i]; 
      FIndex = i;
      for(j=0;j<faculty[i].courses.length;j++){
        for(k=0;k<courses.length;k++){
          if(faculty[i].courses[j] == courses[k].CourseID){
            Courses_taught.push(courses[k]);
            break;
          }
        }
      }
      console.log(Courses_taught);
      res.render("adminHome.ejs",{User : FCurrent_user, Courses_teaching : Courses_taught});
     
      break;
    }
  }
  if(count == 0){
    console.log("not a valid user id and password");
  }


  
});


router.get("/adminSearch", function (req, res) {
  res.render("adminSearch.ejs",{User : user, Courses_Registered : resultcourses});
});


router.get("/adminSearchGo", function (req, res) {
  var sid = req.query.search;  
  console.log("sai" + sid);
  for(i=0;i<users.length;i++){
    if(users[i].SID == sid){
      user = users[i];
      for(j=0;j<users[i].courses.length;j++){
        for(k=0;k<courses.length;k++){
          if(users[i].courses[j] == courses[k].CourseID){
            resultcourses.push(courses[k]);
            break;
          }
        }
      }
      break;
    }
  }
  console.log(resultcourses)
  if(user != null){
    res.render("adminSearch.ejs",{User : user, Courses_Registered : resultcourses});
    user = null;
    resultcourses = [];
  }
  else{
    res.render("adminSearch.ejs",{User : user, Courses_Registered : resultcourses});
  }
 
});




router.post("/addCourse", function (req, res) {
  var new_Course = {
    CourseID: req.body.courseid,
    Course_Name: req.body.coursename, 
    Timings: req.body.time,
    Start_Date:req.body.startdate,
    End_Date: req.body.enddate,
    Location: req.body.location,
    seats : req.body.seats  
  }
  if(new_Course != null){
    courses.push(new_Course);
    Courses_taught.push(new_Course)
    faculty[FIndex].courses.push(req.body.courseid);
  }
  
  console.log(new_Course);
  console.log(courses);
  res.render("adminAddCourse.ejs");
});

router.get("/addCourse", function (req, res) {
 
  res.render("adminAddCourse.ejs");
});

router.get("/updateDeleteCourse", function (req, res) {
  console.log(Courses_taught);
  res.render("adminUpdateDelete.ejs" ,{Courses_teaching : Courses_taught});
});





module.exports = router

