import React from 'react';

const Home = () => {
    return (
        <div className='md:flex md:flex-col md:gap-5 md:items-center md:justify-between md:max-w-[1440px] md:mx-auto my-10'>
            {/* Reduced container width */}
            <div className='flex snap-x snap-mandatory gap-10 w-full min-h-[40vh] overflow-x-auto'>
                <img className='h-full snap-center snap-always w-[40vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className='h-full snap-center snap-always w-[40vw] rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className='h-full snap-center snap-always w-[40vw] rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className='h-full snap-center snap-always w-[40vw] rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className='h-full snap-center snap-always w-[40vw] rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
            </div>
            <div className='border-2 border-slate-700 w-full'>
                <h1 className=''>Best Seafoods in the Town</h1>
            </div>
        </div >
    );
};

export default Home;
