const express = require("express");
const userController = require("./../controllers/UserController");
const authController = require("./../controllers/authController");
const dataController = require("./../controllers/dataController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logOut);

router.get("/getMe",authController.protect,userController.getMe);
router.get("/allData",authController.protect,userController.getAllData);
router.post("/addData", authController.protect, dataController.addData);
// router.use(authController.protect);

module.exports = router;
