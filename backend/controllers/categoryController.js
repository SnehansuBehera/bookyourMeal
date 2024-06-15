import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";


const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(500).json(
            {
                error: "Category name required"
            }
        )
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        res.status(500).send("Category already exists")
    }
    const newCategory = new Category({ name });
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
})
const updateCategory = asyncHandler(async (req, res) => {

    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            res.status(404).json({ error: "category not found" });
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal Error" });

    }
})
const removeCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (category) {
            await Category.deleteOne({ _id: categoryId })
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal Error" });
    }
})

const allCategory = asyncHandler(async (req, res) => {
    try {
        res.status(201).json(await Category.find({}));
    } catch (error) {
        res.status(500).json(error?.data?.message || error.message);
    }
})
const getCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (category) {
            res.json(category);
        } else {
            res.status(500).send("Category not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server Error" });
    }
})

export { createCategory, updateCategory, removeCategory, allCategory, getCategory };