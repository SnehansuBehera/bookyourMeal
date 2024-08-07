import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
    console.log(keyword)
    const { data, isLoading, error } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[18rem] mt-[10rem] text-[3rem] font-medium">
                            Special Products
                        </h1>

                        <Link
                            to="/shop"
                            className="bg-orange-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
                        >
                            Shop
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-center flex-wrap mt-[2rem]">
                            {data.products.map((product) => (
                                <div key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;