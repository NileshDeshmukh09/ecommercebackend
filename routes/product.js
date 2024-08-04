const express = require("express");
const upload = require("../middleware/multer");
const productController = require("../controller/product");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management API
 */

const router = express.Router();

/**
 * @swagger
 * /products/add-bulk-products:
 *   post:
 *     summary: Add multiple products in bulk
 *     description: Adds multiple products to the database in one request.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                   description: The name of the product.
 *                 productPrice:
 *                   type: number
 *                   description: The price of the product.
 *                 productDesc:
 *                   type: string
 *                   description: A description of the product.
 *                 productCategory:
 *                   type: string
 *                   description: The category of the product.
 *                 productImage:
 *                   type: string
 *                   description: URL or path to the product image.
 *                 status:
 *                   type: boolean
 *                   description: The availability status of the product.
 *             example:
 *               - productName: "Product A"
 *                 productPrice: 29.99
 *                 productDesc: "Description of Product A"
 *                 productCategory: "Category 1"
 *                 productImage: "/images/product_a.png"
 *                 status: true
 *               - productName: "Product B"
 *                 productPrice: 39.99
 *                 productDesc: "Description of Product B"
 *                 productCategory: "Category 2"
 *                 productImage: "/images/product_b.png"
 *                 status: true
 *     responses:
 *       201:
 *         description: Products added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/add-bulk-products', productController.addBulkProducts);

/**
 * @swagger
 * /products/getAllProducts:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a list of all products from the database.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productName:
 *                     type: string
 *                   productPrice:
 *                     type: number
 *                   productDesc:
 *                     type: string
 *                   productCategory:
 *                     type: string
 *                   productImage:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Internal server error
 */
router.get("/getAllProducts",productController.getAllProduct);

/**
 * @swagger
 * /products/getProductById/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieves a product based on the provided ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                 productPrice:
 *                   type: number
 *                 productDesc:
 *                   type: string
 *                 productCategory:
 *                   type: string
 *                 productImage:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/getProductById/:id",productController.getProductById);

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database. An image can be uploaded as part of the product creation process.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *               productPrice:
 *                 type: number
 *                 description: The price of the product.
 *               productDesc:
 *                 type: string
 *                 description: A description of the product.
 *               productCategory:
 *                 type: string
 *                 description: The category of the product.
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: The image of the product.
 *               status:
 *                 type: boolean
 *                 description: The availability status of the product.
 *             required:
 *               - productName
 *               - productPrice
 *               - productDesc
 *               - productCategory
 *               - status
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/createProduct",upload.single("productImage"),productController.createProduct);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Updates the details of an existing product based on the provided ID. An image can be updated as part of the update process.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the product to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *               productPrice:
 *                 type: number
 *                 description: The price of the product.
 *               productDesc:
 *                 type: string
 *                 description: A description of the product.
 *               productCategory:
 *                 type: string
 *                 description: The category of the product.
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: The image of the product.
 *               status:
 *                 type: boolean
 *                 description: The availability status of the product.
 *             example:
 *               productName: "Updated Product"
 *               productPrice: 49.99
 *               productDesc: "Updated description"
 *               productCategory: "Updated Category"
 *               productImage: /images/updated_product.png
 *               status: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateProduct/:id", upload.single('productImage'), productController.updateProduct);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes an existing product based on the provided ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the product to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteProduct/:id",productController.deleteProduct);


module.exports = router;