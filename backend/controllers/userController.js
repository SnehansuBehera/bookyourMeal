import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error("Please provide all info");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        generateToken(res, newUser._id)
        res.status(201).json(
            {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        );
    } catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (validPassword) {
            generateToken(res, existingUser._id);
            res.status(201).json(
                {
                    username: existingUser.username,
                    email: existingUser.email,
                    password: existingUser.password,
                    isAdmin: existingUser.isAdmin

                }
            )
        } else {
            res.status(400).send("Wrong credential");

        }
    } else {
        res.status(400).send("User does not exists")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(201).json({
        message: "Logged out successfully"
    })
})
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(201).json(users);
})

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const updatedhashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = updatedhashedPassword || user.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(404);
            throw new Error("Cannot delete the admin");
        }
        await User.deleteOne({ _id: user._id });
        res.status(201).json({
            message: "User removed"
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})
export { createUser, loginUser, logoutUser, getAllUsers, getProfile, updateProfile, deleteUser };