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
        }
    }
})
export { createUser, loginUser };