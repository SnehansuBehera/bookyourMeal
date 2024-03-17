import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    var [addItem, setAddItem] = useState(0);
    var addCart = () => {
        setAddItem(addItem++);
    }
    return (
        <nav className='rounded-2xl shadow-md shadow-slate-200 bg-transparent max-w-[1440px] mx-auto px-8 py-4 my-5 flex items-center justify-between'>
            <h1 style={{ fontFamily: "Sedgwick Ave ,cursive", fontStyle: "normal", fontWeight: 400 }} className=' text-[4vw] md:text-[2vw]'>bookyourMeal</h1>
            <ul className='hidden md:flex md:gap-[3vw] md:justify-center md:items-center'>
                <li><Link to='/'><h2 className='font-semibold text-[1.2vw] md:text-[1.4vw]'>Home</h2></Link></li>
                <li><Link to='/about'><h2 className='font-semibold text-[1.2vw] md:text-[1.4vw]'>About</h2></Link></li>
                <li><Link to='/main'><h2 className='font-semibold text-[1.2vw] md:text-[1.4vw]'>Menu</h2></Link></li>
                <li className=''><input className='w-[12vw] text-[1.2vw] md:text-[1.4vw] rounded-2xl shadow-sm shadow-slate-400 font-normal py-2 px-4' type="text" placeholder='Search...' /></li>
            </ul>
            <div className='hidden md:flex md:justify-center md:items-center md:gap-4'>
                <Link>
                    <div className='relative w-[4.5vw]' onClick={addCart}>
                        <div className='absolute top-[-5px] left-[-6px] rounded-full bg-red-500 w-6 text-center text-white'>{addItem}</div>
                        <img className='' src="/Images/food.png" alt="food-cart" height={50} width={50} />
                    </div>
                </Link>
                <Link><button className=' bg-red-500 border-0 py-2 px-4 text-[1.2vw] text-slate-50 rounded-md shadow-sm shadow-slate-400 font-semibold'>Sign up</button></Link>
                <Link><button className=' bg-transparent border-0 py-2 px-4 text-[1.2vw] text-black rounded-md shadow-sm shadow-slate-400 font-semibold'>Log in</button></Link>
            </div>

        </nav>
    )
}

export default Header
