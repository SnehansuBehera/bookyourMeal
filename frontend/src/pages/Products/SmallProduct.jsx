import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[20rem] ml-[5rem] p-3">
            <div className="relative w-[18rem]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-auto rounded-lg w-full"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4 w-[18rem]">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div className="font-bold">{product.name}</div>
                        <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-600 dark:text-white">
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;