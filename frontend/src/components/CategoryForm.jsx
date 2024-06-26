import React from 'react'

const CategoryForm = ({ value, setValue, handleSubmit, handleDelete, buttonText = "Submit", }) => {
    return (
        <div className='p-3'>
            <form action="" onSubmit={handleSubmit} className='space-y-3'>
                <input type="text" placeholder='Category name' value={value} onChange={(e) => setValue(e.target.value)} className='py-3 px-4 shadow-sm shadow-gray-300 rounded-lg w-full' />
                <div className='flex justify-between'>
                    <button className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50'>
                        {buttonText}
                    </button>
                    {
                        handleDelete &&
                        <button onClick={handleDelete} className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50'>
                            Delete
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default CategoryForm
