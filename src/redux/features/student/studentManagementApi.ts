import { TQueryParams, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getAllEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    enrollCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/enrolled-courses/create-enrolled-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["offeredCourse"],
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
  }),
});

export const {
  useGetAllMyOfferedCoursesQuery,
  useGetAllEnrolledCoursesQuery,
  useEnrollCourseMutation,
} = studentApi;
