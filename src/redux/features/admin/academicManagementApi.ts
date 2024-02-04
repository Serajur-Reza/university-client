import {
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";

import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    getAllAcademicFaculties: builder.query({
      query: () => {
        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),

    getAllAcademicDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-Department",
        method: "POST",
        body: data,
      }),
    }),

    updateAcademicDepartment: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          url: `/academic-departments/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useCreateAcademicSemesterMutation,
  useGetAllAcademicFacultiesQuery,
  useCreateAcademicFacultyMutation,
  useGetAllAcademicDepartmentsQuery,
  useCreateAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} = academicManagementApi;
