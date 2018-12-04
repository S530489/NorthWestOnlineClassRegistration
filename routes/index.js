const express = require('express');
const router = express.Router();
console.log('Inside routes/index')


router.get("/userSignup", function (req, res) {
  res.render("userSignup.ejs");
});

router.get("/userLogin", function (req, res) {
  res.render("userLogin.ejs");
});

router.all("/userHome", function (req, res) {
  res.render("userHome.ejs");
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

