import React from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

export default function AcademicSemester() {
  const { data } = useGetAllSemestersQuery(undefined);

  console.log(data);
  return (
    <div>
      <h1>Academic Semester</h1>
    </div>
  );
}
