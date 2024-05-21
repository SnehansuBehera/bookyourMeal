import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.route('/auth').post(loginUser);
router.post('/logout', logoutUser);

export default router;