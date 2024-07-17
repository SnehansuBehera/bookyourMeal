import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <button
                className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"
                    } bg-transparent p-2 fixed rounded-lg`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <FaTimes color="black" />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                    </>
                )}
            </button>

            {isMenuOpen && (
                <section className="bg-gray-200 p-4 fixed right-7 top-5">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white rounded-sm"
                                to="/admin/dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white rounded-sm"
                                to="/admin/categorylist"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white rounded-sm"
                                to="/admin/productlist"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white rounded-sm"
                                to="/admin/allproductslist"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white rounded-sm"
                                to="/admin/usersList"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="py-2 px-3 block mb-5 hover:bg-white rounded-sm"
                                to="/admin/orderlist"
                                style={({ isActive }) => ({
                                    color: isActive ? "orange" : "black",
                                })}
                            >
                                Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    );
};

export default AdminMenu;