"use strict";
const router = require("express").Router();


const Auth = require("../controllers/auth");

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);

module.exports = router;