import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "Category", "User"],
    endpoints: () => ({})
})
export default apiSlice