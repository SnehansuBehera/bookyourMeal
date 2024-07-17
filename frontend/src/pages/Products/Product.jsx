import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
    return (
        <div className="w-[25rem] ml-[2rem] p-3 relative bg-transparent">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[25rem] rounded-lg"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div className="text-lg">{product.name}</div>
                        <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-600 dark:text-white">
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default Product;