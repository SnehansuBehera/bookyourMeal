import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory, updateCategory, removeCategory, allCategory, getCategory } from "../controllers/categoryController.js";

const router = express.Router();
router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory);
router.route('/:categoryId').delete(authenticate, authorizeAdmin, removeCategory);
//
router.route('/all').get(allCategory);
router.route('/:categoryId').get(authenticate, authorizeAdmin, getCategory);

export default router;