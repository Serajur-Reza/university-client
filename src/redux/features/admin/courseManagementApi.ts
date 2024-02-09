import { TQueryParams, TResponseRedux } from "../../../types";
import { TSemester } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/semester-registrations/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    createSemesterRegistration: builder.mutation({
      query: (data) => {
        return {
          url: "/semester-registrations/create-semester-registration",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["semester"],
    }),

    updateSemesterRegistrationStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/semester-registrations/${id}`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: ["semester"],
    }),

    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    createCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["courses"],
    }),

    getCourseFaculties: builder.query({
      query: (args) => {
        return {
          url: `/courses/${args}/get-faculties`,
          method: "GET",
        };
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
      providesTags: ["faculties"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    addFaculties: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/courses/${id}/assign-faculties`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["faculties"],
    }),

    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    addOfferedCourse: builder.mutation({
      query: (data) => {
        return {
          url: `/offered-courses/create-offered-course`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetAllSemesterRegistrationsQuery,
  useGetAllCoursesQuery,
  useGetAllFacultiesQuery,
  useGetAllOfferedCoursesQuery,
  useLazyGetCourseFacultiesQuery,
  useCreateSemesterRegistrationMutation,
  useCreateCourseMutation,
  useAddFacultiesMutation,
  useAddOfferedCourseMutation,
  useUpdateSemesterRegistrationStatusMutation,
} = courseApi;
