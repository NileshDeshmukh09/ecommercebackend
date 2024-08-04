const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  signup,
  updatePassword,
  sendSuccessCheckoutEmail,
} = require("../controller/user");
const upload = require("../middleware/multer");
/*
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *         - contactNumber
 *         - role
 *         - status
 *         - userImage
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         password:
 *           type: string
 *           description: The user's password.
 *         contactNumber:
 *           type: string
 *           description: The user's contact number.
 *         role:
 *           type: string
 *           description: The user's role.
 *         status:
 *           type: string
 *           description: The user's status.
 *         userImage:
 *           type: string
 *           description: URL or path to the user's image.
 *       example:
 *         id: 605c72ef8e4b3f001f6470c0
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: password123
 *         contactNumber: '1234567890'
 *         role: user
 *         status: active
 *         userImage: /images/john_doe.png
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */


const router = express.Router();

/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/getAllUsers", getAllUsers);

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates the details of an existing user based on the provided user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's new password.
 *               contactNumber:
 *                 type: string
 *                 description: The user's contact number.
 *               role:
 *                 type: string
 *                 description: The user's role.
 *               status:
 *                 type: string
 *                 description: The user's status (e.g., active, inactive).
 *               userImage:
 *                 type: string
 *                 description: URL or path to the user's image.
 *             example:
 *               firstName: Jane
 *               lastName: Doe
 *               email: jane.doe@example.com
 *               password: newpassword123
 *               contactNumber: '0987654321'
 *               role: admin
 *               status: active
 *               userImage: /images/jane_doe.png
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */



router.put("/updateUser/:id", updateUser);

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes an existing user based on the provided user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteUser/:id", deleteUser);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Creates a new user account with the provided details. An image can be uploaded as part of the sign-up process.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               contactNumber:
 *                 type: string
 *                 description: The user's contact number.
 *               role:
 *                 type: string
 *                 description: The user's role.
 *               userImage:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile image.
 *             required:
 *               - firstName
 *               - email
 *               - password
 *               - contactNumber
 *               - role
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User signed up successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/signup", upload.single("userImage"), signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user with the provided credentials.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
router.put("/updatePassword/:id", updatePassword);

/**
 * @swagger
 * /users/checkout/success:
 *   post:
 *     summary: Send success checkout email
 *     description: Sends a success email after a successful checkout process.
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to which the success message will be sent.
 *             required:
 *               - email
 *              
 *     responses:
 *       200:
 *         description: Success email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success email sent successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/checkout/success", sendSuccessCheckoutEmail);

module.exports = router;
