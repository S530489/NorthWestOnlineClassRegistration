const express = require('express');
const router = express.Router();
console.log('Inside routes/index')
var users = [{SID:"s530489",First_Name:"Sai Kumar",Last_Name:"Uppala",Password:"1234567",pic:"img",courses:["C123","C125"]},
             {SID:"s530488",First_Name:"Swaroop",Last_Name:"Aditya",Password:"1234567",pic:"img",courses:["C124","C125"]}];

var faculty = [{FID:"f530489",First_Name:"Case",Last_Name:"Dennis",Password:"1234567",pic:"img",courses:["C123","C125"]},
              {FID:"f530489",First_Name:"Nathan",Last_Name:"Eloe",Password:"1234567",pic:"img",courses: ["C123"]}]


var courses = [{CourseID:"C123",Course_Name:"Java", Timings:"10:30",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall"},
               {CourseID:"C124",Course_Name:"Web-apps", Timings:"9:30",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall"},
               {CourseID:"C125",Course_Name:"BigData", Timings:"8:00",Start_Date:"08/10/2018",End_Date:"11/15/2018",Location:"Colden Hall"}]
var CurrentID ;



router.get("/userSignup", function (req, res) {
  res.render("userSignup.ejs");
});

router.get("/userLogin", function (req, res) {
  res.render("userLogin.ejs");
});

router.get("/userHome", function (req, res) {
  res.render("userHome.ejs",{SID : CurrentID});
});



router.post("/userHome", function (req, res) {
   var username = req.body.username;
   var Password = req.body.password;
   var count = 0;
   console.log(username+" "+Password);
   for(i=0; i< users.length;i++){
     console.log(users[i])
     if(users[i].SID == username && users[i].Password == Password){
       count +=1;
       CurrentID = users[i].SID;
      res.render("userHome.ejs",{SID : CurrentID});
      break;
     } 
   }
   if(count == 0){
     console.log("not a valid user id and password");
   }
 
});

router.get("/userSearch", function (req, res) {
  res.render("userSearch.ejs");
});

router.get("/userRegisterDrop", function (req, res) {
  res.render("userRegisterDrop.ejs");
});

//Admin routes

router.get("/adminSignup", function (req, res) {
  res.render("adminSignup.ejs");
});

router.get("/adminLogin", function (req, res) {
  res.render("adminLogin.ejs");
});

router.all("/adminHome", function (req, res) {
  res.render("adminHome.ejs");
});

router.get("/adminSearch", function (req, res) {
  res.render("adminSearch.ejs");
});


router.get("/addCourse", function (req, res) {
  res.render("adminAddCourse.ejs");
});

router.get("/updateDeleteCourse", function (req, res) {
  res.render("adminUpdateDelete.ejs");
});





module.exports = router

