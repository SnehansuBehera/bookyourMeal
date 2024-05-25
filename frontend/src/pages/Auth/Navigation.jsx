import React, { useState } from 'react'
// import { FaHeart } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const toggleDropDown = () => {
        setDropDownMenu(!dropDownMenu);
    }
    const closeDropDown = () => {
        setShowSidebar(false);
    }
    return (
        <div className={`${showSidebar ? 'hidden' : 'flex'} hidden lg:flex bg-black text-white flex-col p-4 w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>
            <div className='flex flex-col justify-center gap-10 my-8'>
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                    <AiOutlineHome className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>HOME</span>
                </Link>
                <Link to='/order' className='flex items-center transition-transform transform hover:translate-x-2 gap-3 '>
                    <AiOutlineShopping className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>ORDER</span>
                </Link>
                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                    <AiOutlineShoppingCart className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>CART</span>
                </Link>
            </div>
        </div>
    )
}

export default Navigation
