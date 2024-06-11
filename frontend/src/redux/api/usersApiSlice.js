
import { USERS_URL } from "../constants"
import apiSlice from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,

            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data

            }),

        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",

            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        getUserDetail: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,

            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            })
        })
    }),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation, useGetUsersQuery, useGetUserDetailQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;