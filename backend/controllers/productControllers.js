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
export { createProduct };