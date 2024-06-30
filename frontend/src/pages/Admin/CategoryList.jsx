import React, { useState } from 'react'
import { useAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import AdminMenu from './AdminMenu';

const CategoryList = () => {
    const { data } = useAllCategoriesQuery();
    console.log(data);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateName, setUpdateName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [createCategory] = useCreateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Category name is required");
        } else {
            try {
                const res = await createCategory({ name }).unwrap();
                if (!res) {
                    toast.error("Not created category");
                } else {
                    console.log(res);
                    setName("");
                    toast.success("Category created successfully");
                }

            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const res = await deleteCategory(selectedCategory._id).unwrap();
            toast.success(`${res.name} deleted successfully`);
            setSelectedCategory(null);
            setUpdateName("");
            setModalVisible(false);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updateName) {
            toast.error("Required category name");
        } else {
            try {
                await updateCategory({ categoryId: selectedCategory._id, data: { name: updateName } }).unwrap();
                toast.success("Updated successfully");
                setSelectedCategory(null);
                setUpdateName("");
                setModalVisible(false);
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
    return (
        <div className='flex flex-col md:flex-row ml-[10rem]'>
            <div className='md:w-3/4 p-3'>
                <AdminMenu />
                <div className='h-12'>CategoryList</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                <div className="flex flex-wrap">
                    {data?.map((item) => (
                        <div key={item._id}>
                            <button className='bg-white border border-orange-500 text-orange-500 py-2 px-4 rounded-lg m-3 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50' onClick={() => {
                                {
                                    setModalVisible(true)
                                    setSelectedCategory(item)
                                    setUpdateName(item.name)
                                }
                            }}>{item.name}</button>
                        </div>

                    ))}
                </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updateName} setValue={(value) => setUpdateName(value)} handleSubmit={handleUpdateCategory} handleDelete={handleDeleteCategory} buttonText='Update' />
                </Modal>

            </div>

        </div>
    )
}

export default CategoryList
