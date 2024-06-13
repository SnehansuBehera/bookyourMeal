import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import { useUpdateUserMutation } from '../../redux/api/usersApiSlice';
import { useDeleteUserMutation } from '../../redux/api/usersApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
const UserLists = () => {
    const { data, refetch, isLoading, error } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUsername, setEditableUsername] = useState('');
    const [editableUserEmail, setEditableUserEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        try {
            await deleteUser(id);
        } catch (error) {
            toast.error(error.data.message || error.message);
        }
    }
    const updateHandler = async (id) => {
        try {
            await updateUser({
                _id: id,
                username: editableUsername,
                email: editableUserEmail,
            })
            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message || error.message);
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUsername(username);
        setEditableUserEmail(email);
    }

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-2xl font-semibold'>Users</h1>
            {isLoading ? <Loader /> : (error ? (<Message variant="danger">{error?.data?.message || error.message}</Message>) : <div className='flex flex-col md:flex-row'>
                <table className="w-full mx-auto md:w-4/5">
                    <thead>
                        <tr>
                            <th className='text-left px-4 py-2'>ID</th>
                            <th className='text-left px-4 py-2'>NAME</th>
                            <th className='text-left px-4 py-2'>EMAIL</th>
                            <th className='text-left px-4 py-2'>ADMIN</th>
                            <th className='text-left px-4 py-2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id}>
                                <td className='px-4 py-2'>{item._id}</td>
                                <td className='px-4 py-2'>
                                    {editableUserId === item._id ? (
                                        <div className='flex items-center'>
                                            <input type="text" value={editableUsername} onChange={(e) => setEditableUsername(e.target.value)} className='w-full border rounded-lg p-2' />
                                            <button onClick={() => updateHandler(item._id)} className='bg-blue-500 ml-2 px-4 py-2 text-white rounded-lg'><FaCheck /></button>

                                        </div>
                                    ) : <div className='flex items-center'>
                                        {item.username} {" "}
                                        <button onClick={() => toggleEdit(item._id, item.username, item.email)}>
                                            <FaEdit className='ml-[1rem]' />
                                        </button>
                                    </div>}
                                </td>
                                <td>
                                    {editableUserId === item._id ? (
                                        <div className='flex items-center'>
                                            <input type="text" value={editableUserEmail} onChange={(e) => setEditableUserEmail(e.target.value)} className='w-full border rounded-lg p-2' />
                                            <button onClick={() => updateHandler(item._id)} className='bg-blue-500 ml-2 px-4 py-2 text-white rounded-lg'><FaCheck /></button>

                                        </div>
                                    ) : <div className='flex items-center'>
                                        {item.email}
                                        <button onClick={() => toggleEdit(item._id, item.username, item.email)}>
                                            <FaEdit className='ml-[1rem]' />
                                        </button>
                                    </div>}
                                </td>
                                <td className='px-4 py-2'>
                                    {item.isAdmin ? <div className=''>
                                        <FaCheck style={{ color: "green" }} />
                                    </div> : <div>
                                        <FaTimes style={{ color: "red" }} />
                                    </div>}
                                </td>
                                <td className='px-4 py-2'>
                                    {!item.isAdmin && <button onClick={() => deleteHandler(item._id)} className='bg-red-500 hover:bg-red-700 text-white rounded py-2 px-4 font-bold'><FaTrash /></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)
            }
        </div>
    )
}

export default UserLists;
