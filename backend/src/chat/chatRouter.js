const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdfasdfnkasdf;lnasflkasnf;klsnafklnas;flnaslfnn;aslnf;sanfknas;lfnkasdnf;";

router.use(express.json())

const User = require("../models/user")


// Main
// router.get("/", (req, res) => {


// })



module.exports = router;