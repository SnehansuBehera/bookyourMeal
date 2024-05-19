import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"

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

export { createUser };