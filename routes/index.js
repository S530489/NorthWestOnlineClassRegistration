const express = require('express');
const router = express.Router();
var flash = require('express-flash-messages')
router.use(flash())


console.log('Inside routes/index')
var users = [{ SID: "s530489", First_Name: "Sai Kumar", Last_Name: "Uppala", Password: "1234567", pic: "img", courses: ["C123", "C125"] },
{ SID: "s530488", First_Name: "Swaroop", Last_Name: "Aditya", Password: "1234567", pic: "img", courses: ["C124", "C125"] }];

var faculty = [{ FID: "f530489", First_Name: "Case", Last_Name: "Dennis", Password: "1234567", pic: "img", courses: ["C123", "C125"] },
{ FID: "f530488", First_Name: "Nathan", Last_Name: "Eloe", Password: "1234567", pic: "img", courses: ["C123"] }]


var courses = [{ CourseID: "C123", Course_Name: "Java", Timings: "10:30", Start_Date: "2019-01-15", End_Date: "2019-04-26", Location: "CH-3650", seats: 20 },
{ CourseID: "C124", Course_Name: "Web-apps", Timings: "09:30", Start_Date: "2019-01-14", End_Date: "2019-04-28", Location: "CH-3200", seats: 20 },
{ CourseID: "C125", Course_Name: "BigData", Timings: "08:00", Start_Date: "2019-01-14", End_Date: "2019-04-19", Location: "CH-1150", seats: 25 }]
var CurrentID = null;
var Student_Courses = [];
var Other_Courses = [];
var Current_user = null;
var result_Course = null;

var FCurrent_user = null;
var FIndex = null;
var Courses_taught = [];
var user = null;
var resultcourses = [];



router.all("/", function (request, response) {
  CurrentID = null;
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
  //req.flash('notify', 'This is a test notification.')
  res.render("userSignup.ejs", { errormsg: "success" });
});

router.get("/userLogin", function (req, res) {
  //req.flash('notify', 'This is a test notification.')
  res.render("userLogin.ejs", { errormsg: "success" });
});

router.get("/userHome", function (req, res) {
  res.render("userHome.ejs", { User: Current_user, Courses_Registered: Student_Courses });
});



router.post("/userHome", function (req, res) {
  var username = req.body.username;
  var Password = req.body.password;
  var count = 0;
  Student_Courses = [];
  console.log(username + " " + Password);
  for (i = 0; i < users.length; i++) {
    if (users[i].SID == username && users[i].Password == Password) {
      count += 1;
      CurrentID = users[i].SID;
      Current_user = users[i];
      for (j = 0; j < users[i].courses.length; j++) {
        for (k = 0; k < courses.length; k++) {
          if (users[i].courses[j] == courses[k].CourseID) {
            Student_Courses.push(courses[k]);
            break;
          }
        }
      }
      var count1;
      for (k = 0; k < courses.length; k++) {
        count1 = 0;
        for (j = 0; j < users[i].courses.length; j++) {
          if (courses[k].CourseID == users[i].courses[j]) {
            count1++;
            break;
          }
        }
        if (count1 == 0) {
          Other_Courses.push(courses[k]);
        }
      }

      console.log(users[i]);
      console.log(Student_Courses);
      console.log(Other_Courses)
      res.render("userHome.ejs", { User: users[i], Courses_Registered: Student_Courses });
      break;
    }
  }
  if (count == 0) {
    console.log("not a valid user id and password");
    res.render("userLogin.ejs", { errormsg: "Not a valid combination of ID and Password" });
  }

});

router.get("/userSearch", function (req, res) {
  res.render("userSearch.ejs", { course: result_Course, errormsg: "success" });
});

router.post("/createUser", function (req, res) {


  var new_user = {
    SID: req.body.studentId,
    First_Name: req.body.firstName,
    Last_Name: req.body.lastName,
    Password: req.body.password,
    pic: "img",
    courses: []
  }
  console.log(new_user);
  if (req.body.password == req.body.password2) {
    users.push(new_user);
    res.render("userSignup.ejs", { errormsg: "User has been created successfully" });
  }
  else {
    res.render("userSignup.ejs", { errormsg: "Passwords didn't match, please enter again" });
  }

});

router.get("/userRegisterDrop", function (req, res) {
  res.render("userRegisterDrop.ejs", { User: Current_user, Courses_Registered: Student_Courses, Courses_Not: Other_Courses, errormsg: "success"});

});

router.get("/userSearchGo", function (req, res) {
  console.log(req.query)
  var Input_Course = req.query.search;
  for (i = 0; i < courses.length; i++) {
    if (Input_Course == courses[i].CourseID) {
      result_Course = courses[i];
    }
  }
  console.log(result_Course)
  if (result_Course != null) {
    res.render("userSearch.ejs", { course: result_Course,errormsg: "success" });
  }
  else {
    res.render("userSearch.ejs", { course: result_Course,errormsg: "No Course found, Please check the course ID" });
  }
  result_Course = null;
});


router.post("/drop", function (req, res) {
  var CID = req.body.courseid;
  var courseName ;
  console.log(CID)
  var index;
  for (i = 0; i < Student_Courses.length; i++) {
    if (CID == Student_Courses[i].CourseID) {
      console.log("came to push")
      courseName = Student_Courses[i].Course_Name;
      Other_Courses.push(Student_Courses[i]);
      index = i;
      break;
    }
  }
  for (i = index; i < Student_Courses.length - 1; i++) {
    Student_Courses[i] = Student_Courses[i + 1];
  }

  Student_Courses.pop();
  console.log("Student_Courses :")
  console.log(Student_Courses);
  console.log("Other_Courses :")
  console.log(Other_Courses)

  res.render("userRegisterDrop.ejs", { User: Current_user, Courses_Registered: Student_Courses, Courses_Not: Other_Courses, errormsg: "You dropped a Course -"+courseName });
});

router.post("/register", function (req, res) {
  var CID = req.body.courseid;
  console.log(CID);
  var courseName ;
  var index;
  for (i = 0; i < Other_Courses.length; i++) {
    if (CID == Other_Courses[i].CourseID) {
      Student_Courses.push(Other_Courses[i]);
      courseName = Other_Courses[i].Course_Name;
      index = i;
      break;
    }
  }
  for (i = index; i < Other_Courses.length - 1; i++) {
    Other_Courses[i] = Other_Courses[i + 1];
  }
  Other_Courses.pop();

  console.log(Student_Courses);
  console.log(Other_Courses);

  res.render("userRegisterDrop.ejs", { User: Current_user, Courses_Registered: Student_Courses, Courses_Not: Other_Courses, errormsg: "You registered for a Course -"+courseName });
  
});

//Admin routes

router.get("/adminSignup", function (req, res) {
  res.render("adminSignup.ejs", { errormsg: "success" });
});

router.get("/adminLogin", function (req, res) {
  res.render("adminLogin.ejs", { errormsg: "success" });
});
router.get("/adminHome", function (req, res) {
  res.render("adminHome.ejs", { User: FCurrent_user, Courses_teaching: Courses_taught });
});

router.post("/adminHome", function (req, res) {
  var username = req.body.username;
  var Password = req.body.password;
  console.log(username + " " + Password)
  var count = 0;
  for (i = 0; i < faculty.length; i++) {
    if (faculty[i].FID == username && faculty[i].Password == Password) {
      count++;
      FCurrent_user = faculty[i];
      FIndex = i;
      for (j = 0; j < faculty[i].courses.length; j++) {
        for (k = 0; k < courses.length; k++) {
          if (faculty[i].courses[j] == courses[k].CourseID) {
            Courses_taught.push(courses[k]);
            break;
          }
        }
      }
      console.log(Courses_taught);
      res.render("adminHome.ejs", { User: FCurrent_user, Courses_teaching: Courses_taught });

      break;
    }
  }
  if (count == 0) {
    res.render("adminLogin.ejs", { errormsg: "Not a Valid Combination of ID and Password" });
  }



});


router.get("/adminSearch", function (req, res) {
  res.render("adminSearch.ejs", { User: user, Courses_Registered: resultcourses,errormsg: "success" });
});


router.get("/adminSearchGo", function (req, res) {
  var sid = req.query.search;
  console.log("sai" + sid);
  for (i = 0; i < users.length; i++) {
    if (users[i].SID == sid) {
      user = users[i];
      for (j = 0; j < users[i].courses.length; j++) {
        for (k = 0; k < courses.length; k++) {
          if (users[i].courses[j] == courses[k].CourseID) {
            resultcourses.push(courses[k]);
            break;
          }
        }
      }
      break;
    }
  }
  console.log(resultcourses)
  if (user != null) {
    res.render("adminSearch.ejs", { User: user, Courses_Registered: resultcourses,errormsg: "success"});
    user = null;
    resultcourses = [];
  }
  else {
    res.render("adminSearch.ejs", { User: user, Courses_Registered: resultcourses,errormsg: "No Student Found, Please check the ID" });
  }

});


router.post("/Createfaculty", function (req, res) {

  var new_faculty = {
    FID: req.body.studentId,
    First_Name: req.body.firstName,
    Last_Name: req.body.lastName,
    Password: req.body.password,
    pic: "img",
    courses: []
  }
  console.log(new_faculty);

  if (req.body.password == req.body.password2) {
    faculty.push(new_faculty);
    res.render("adminSignup.ejs", { errormsg: "Faculty has been created successfully" });
  }
  else {
    res.render("adminSignup.ejs", { errormsg: "Passwords didn't match, please enter again" });
  }

  
});



router.post("/addCourse", function (req, res) {
  console.log(req.body.startdate)
  console.log(req.body.enddate)
  console.log(req.body.time)
  var date1 = new Date(req.body.startdate);
  var date2 = new Date(req.body.enddate);
  console.log(date1+"  "+date2)
  var new_Course = {
    CourseID: req.body.courseid,
    Course_Name: req.body.coursename,
    Timings: req.body.time,
    Start_Date: req.body.startdate,
    End_Date: req.body.enddate,
    Location: req.body.location,
    seats: req.body.seats
   }

  if(date1 > date2){
    res.render("adminAddCourse.ejs",{errormsg: "Start Date should come before End date"});
  }

  if (new_Course != null) {
    courses.push(new_Course);
    Courses_taught.push(new_Course)
    faculty[FIndex].courses.push(req.body.courseid);
    res.render("adminAddCourse.ejs",{errormsg: "New course "+req.body.coursename +" has been added"});
  }

  console.log(new_Course);
  console.log(courses);
 
});

router.get("/addCourse", function (req, res) {

  res.render("adminAddCourse.ejs",{errormsg: "success"});
});

router.get("/updateDeleteCourse", function (req, res) {
  console.log(Courses_taught);
  res.render("adminUpdateDelete.ejs", { Courses_teaching: Courses_taught });
});

router.post("/update", function (req, res) {
  console.log(req.body);
  // res.render("adminUpdateDelete.ejs" ,{Courses_teaching : Courses_taught});
});




module.exports = router

