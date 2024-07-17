import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className=" py-3 lg:block xl:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Slider
                    {...settings}
                    className="xl:w-[35rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
                >
                    {products.map(
                        ({
                            image,
                            _id,
                            name,
                            price,
                            description,
                            brand,
                            createdAt,
                            numReviews,
                            rating,
                            quantity,
                            countInStock,
                        }) => (
                            <div key={_id}>
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full rounded-lg object-cover h-[20rem]"
                                />

                                <div className="mt-4 flex justify-between gap-4">
                                    <div className="one flex flex-col gap-4">
                                        <div className="flex justify-start gap-3">
                                            <h2 className="font-bold">{name}</h2>
                                            <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-600 dark:text-white">
                                                ${price}
                                            </span>
                                        </div>
                                        <p className="w-[15rem] text-sm text-gray-600 leading-5">
                                            {description.substring(0, 100)} ...
                                        </p>
                                    </div>

                                    <div className="flex justify-between w-[20rem]">
                                        <div className="one flex flex-col gap-2 justify-start items-start">
                                            <h1 className="flex items-center">
                                                <FaStore className="mr-2 text-black text-sm" />
                                                <p className="font-medium text-sm">Brand: <span className="text-gray-500">{brand}</span></p>
                                            </h1>
                                            <h1 className="flex items-center">
                                                <FaClock className="mr-2 text-black text-sm" />

                                                <p className="font-medium text-sm">Added: <span className="text-gray-500">{moment(createdAt).fromNow()}</span></p>
                                            </h1>
                                            <h1 className="flex items-center">
                                                <FaStar className="mr-2 text-black text-sm" />

                                                <p className="font-medium text-sm">Reviews: <span className="text-gray-500">{numReviews}</span></p>
                                            </h1>
                                        </div>

                                        <div className="two flex flex-col gap-2 justify-start items-start">
                                            <h1 className="flex items-center">
                                                <FaStar className="mr-2 text-black text-sm" />

                                                <p className="font-medium text-sm">Ratings: <span className="text-gray-500">{Math.round(rating)}</span></p>
                                            </h1>
                                            <h1 className="flex items-center">
                                                <FaShoppingCart className="mr-2 text-black text-sm" />

                                                <p className="font-medium text-sm">Quantity: <span className="text-gray-500">{quantity}</span></p>
                                            </h1>
                                            <h1 className="flex items-center">
                                                <FaBox className="mr-2 text-black text-sm" />

                                                <p className="font-medium text-sm">In Stock: <span className="text-gray-500">{countInStock}</span></p>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </Slider>
            )}
        </div>
    );
};

export default ProductCarousel;