import { TQueryParams, TResponseRedux } from "../../../types";

import { baseApi } from "../../api/baseApi";

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    addMark: builder.mutation({
      query: (data) => {
        return {
          url: `/enrolled-courses/update-enrolled-course-marks`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: ["semester"],
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useAddMarkMutation } = facultyApi;
