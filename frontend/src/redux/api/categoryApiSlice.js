import { CATEGORY_URL } from "../constants";
import apiSlice from "./apiSlice";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: data,
            })
        }),
        updateCategory: builder.mutation({
            query: ({ categoryId, data }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: data,
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),
        allCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
            })
        })
    })
})
export const { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useAllCategoriesQuery } = categoryApiSlice;