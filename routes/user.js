const express = require("express");
const { getAllUsers  , updateUser , deleteUser , login , signup, updatePassword, sendSuccessCheckoutEmail} = require("../controller/user");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/getAllUsers",getAllUsers);  
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id",deleteUser);
router.post("/signup", upload.single("userImage") ,signup)
router.post("/login",login);
router.put("/updatePassword/:id",updatePassword);
router.post("/checkout/success", sendSuccessCheckoutEmail);

module.exports = router;