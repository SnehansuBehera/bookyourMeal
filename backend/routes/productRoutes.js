import express from "express";
import formidable from "express-formidable";
import { createProduct, updateProduct, deleteProduct, fetchAllProducts, getProduct, writeReview, topProducts, newProducts } from "../controllers/productControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js"

const router = express.Router();

router.get('/top', topProducts);
router.get('/new', newProducts);
router.route("/:id/reviews").post(authenticate, authorizeAdmin, checkId, writeReview);
router.route('/').post(authenticate, authorizeAdmin, formidable(), createProduct);
router.route("/allProducts").get(authenticate, authorizeAdmin, fetchAllProducts);
router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProduct).delete(authenticate, authorizeAdmin, deleteProduct).get(getProduct);



export default router;