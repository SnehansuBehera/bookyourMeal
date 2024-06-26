import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getProfile, updateProfile, deleteUser, getUser, updateUserById } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.route('/auth').post(loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(authenticate, getProfile).put(authenticate, updateProfile);
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUser).get(authenticate, authorizeAdmin, getUser).put(authenticate, authorizeAdmin, updateUserById);


export default router;