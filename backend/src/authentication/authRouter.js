const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdfasdfnkasdf;lnasflkasnf;klsnafklnas;flnaslfnn;aslnf;sanfknas;lfnkasdnf;";

router.use(express.json())

const User = require("../models/user")

router.get("/", (req, res) => {
    res.redirect("/")
})

// Login
router.post("/login", async (req, res) => {

    // Passed credentials
    const {
        username,
        password
    } = req.body;

    // Find the user document
    const user = await User.findOne({
        username
    }).lean();

    if (!user) {
        return res.json({
            status: "fail",
            data: "User doesn't exists"
        })

    } else {

        // Check for password hashing
        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, JWT_SECRET);

            return res.json({
                status: "success",
                data: token
            })

        } else {
            return res.json({
                status: "fail",
                data: "Invalid credentials"
            })
        }


    }

});

// Registration
router.post("/register", async (req, res) => {

    // Passed credentials
    const {
        username,
        email,
        password: plainTextPassword
    } = req.body;

    // Password hashing
    const password = await bcrypt.hash(plainTextPassword, 10);

    try {

        // User document creation
        await User.create({
            username,
            email,
            password
        });

        return res.json({
            status: "success",
            data: ""
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.json({
                status: "fail",
                data: Object.keys(error.keyPattern)[0]
            });
        }

        throw error;

    }


});

// Logout
router.get("/logout", async (req, res) => {

    return res.json({
        status: "success",
        data: ""
    });


});

module.exports = router;