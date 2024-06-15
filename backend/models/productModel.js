import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;


const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamp: true });
const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: { type: ObjectId, ref: 'Category', required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        reviews: [reviewSchema],
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        brand: { type: String, required: true },
    },
    { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);
export default Product;