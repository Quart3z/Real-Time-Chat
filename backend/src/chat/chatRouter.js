const express = require("express");
const router = express.Router()


router.use(express.json())

const User = require("../models/user")



module.exports = router;