import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";


const Main = () => {
    const [meal, setMeal] = useState([]);

    useEffect(() => {

        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood").then((res) => {
            setMeal(res.data.meals)
            console.log(res.data.meals);
        }).catch((err) => console.log(err))

    }, [])

    const mealItems = meal.map(({ idMeal, strMeal, strMealThumb }) => {

        return (
            <div className='flex flex-col flex-wrap gap-1'>
                <img className='w-[85%] max-h-[60vw] mx-auto sm:w-[28vw] rounded-2xl shadow-md shadow-gray-400' src={strMealThumb} alt="pic" />
                <div className='w-[85%] mx-auto sm:w-[28vw] flex flex-row items-center justify-between gap-4 py-1 md:py-[1vw] px-3'>
                    <h1 className='font-bold text-[2.5vw] sm:text-[2vw] md:text-base'>{strMeal}</h1>
                    <h1 className='font-semibold text-[2.5vw] sm:text-[2vw] md:text-base'>#id : {idMeal}</h1>
                </div>
            </div>
        )
    })

    return (
        <div className='flex flex-col gap-4 md:max-w-[1440px] md:mx-auto sm:flex sm:flex-row sm:flex-wrap sm:gap-4 sm:items-center sm:justify-evenly'>
            {mealItems}
        </div>
    )
}

export default Main

