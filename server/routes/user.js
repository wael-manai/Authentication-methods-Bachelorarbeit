const express = require('express');
const router = express.Router();

const controllers = require ("../controllers/user.js");

router.post("/signin", controllers.signin);
router.post("/signup", controllers.signup);
router.post("/magic", controllers.magicin);
module.exports = router;