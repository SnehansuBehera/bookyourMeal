import React from 'react';

const Home = () => {
    return (
        <div className='flex flex-col gap-[2vw] md:items-center md:justify-between md:max-w-[1440px]  md:mx-auto my-[2vw] px-5 lg:px-6 '>
            <div className='flex container-snap snap-x snap-mandatory gap-[2vw] w-full  overflow-x-scroll'>
                <img className=' shadow-lg shadow-gray-800 h-full snap-center snap-always w-[84vw] sm:w-[82vw] md:w-[52vw] lg:w-[44vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className=' shadow-lg shadow-gray-800 h-full snap-center snap-always w-[84vw] sm:w-[82vw] md:w-[52vw] lg:w-[44vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className=' shadow-lg shadow-gray-800 h-full snap-center snap-always w-[84vw] sm:w-[82vw] md:w-[52vw] lg:w-[44vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className=' shadow-lg shadow-gray-800 h-full snap-center snap-always w-[84vw] sm:w-[82vw] md:w-[52vw] lg:w-[44vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />
                <img className=' shadow-lg shadow-gray-800 h-full snap-center snap-always w-[84vw] sm:w-[82vw] md:w-[52vw] lg:w-[44vw]  rounded-2xl' src="./Images/pic1.jpg" alt="pic" />

            </div>
            <div className='rounded-lg shadow-lg shadow-gray-400 gap-4 flex flex-row items-center justify-between w-full pl-3 pr-4 py-3 sm:py-4 sm:pl-5 sm:pr-5 2xl:py-4'>
                <h1 className=' font-serif text-[6.2vw] w-[42vw] sm:text-[7vw] sm:w-[43vw] leading-[6vw] lg:leading-[5vw] lg:text-[5vw] lg:w-[40vw] 2xl:w-[38vw] 2xl:text-[4vw] font-bold text-zinc-800'>Best Seafoods in the Town</h1>
                <img className='w-[42vw] sm:w-[40vw] lg:w-[35vw] 2xl:w-[28vw] rounded-2xl' src="./Images/pic2.jpg" alt="pic" height={300} width={200} />
            </div>
        </div >
    );
};

export default Home;
