import { TQueryParams, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    blockUser: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          url: `users/change-status/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetAllAdminsQuery,
  useGetAllFacultiesQuery,
  useAddStudentMutation,
  useAddAdminMutation,
  useAddFacultyMutation,
  useBlockUserMutation,
  useChangePasswordMutation,
} = userApi;
