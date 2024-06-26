import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const createProduct = asyncHandler(async (req, res) => {

    try {

        const { name, brand, description, quantity, category, price } = req.fields;
        switch (true) {
            case (!name):
                res.status(500).json({ error: "name is required" });
            case (!brand):
                res.status(500).json({ error: "brand is required" });
            case (!description):
                res.status(500).json({ error: "description is required" });
            case (!quantity):
                res.status(500).json({ error: "quantity is required" });
            case (!category):
                res.status(500).json({ error: "category is required" });
            case (!price):
                res.status(500).json({ error: "price is required" });
        }
        const createdProduct = new Product({ ...req.fields });
        await createdProduct.save();
        res.json(createdProduct);
    } catch (error) {
        res.status(400).json(error.message);
    }

})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, brand, description, quantity, category, price } = req.fields;
        switch (true) {
            case (!name):
                res.status(500).json({ error: "name is required" });
            case (!brand):
                res.status(500).json({ error: "brand is required" });
            case (!description):
                res.status(500).json({ error: "description is required" });
            case (!quantity):
                res.status(500).json({ error: "quantity is required" });
            case (!category):
                res.status(500).json({ error: "category is required" });
            case (!price):
                res.status(500).json({ error: "price is required" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json(error.message);
    }
})
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400).json(error.message);
    }

});
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).limit(12);
        res.json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
});
const getProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json(error.message);
    }
});
const writeReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                res.status(500).send("You have already reviwed the product");
            } else {
                const review = {
                    name: req.user.username,
                    rating: Number(rating),
                    comment: comment,
                    user: req.user._id,
                }
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

                await product.save();
                res.status(201).send("Review submitted");
            }

        } else {

            res.status(500).json({ error: "Product not found" });
        }


    } catch (error) {
        res.status(500).json(error.message);
    }
})
const topProducts = asyncHandler(async (req, res) => {
    try {
        const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.status(201).json(topProducts);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

})
const newProducts = asyncHandler(async (req, res) => {
    try {
        const newProducts = await Product.find({}).sort({ _id: -1 });
        res.status(201).json(newProducts);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
})

export { createProduct, updateProduct, deleteProduct, fetchAllProducts, getProduct, writeReview, topProducts, newProducts };