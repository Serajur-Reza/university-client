import React from "react";
import { useParams } from "react-router-dom";

export default function StudentDetails() {
  const { studentId } = useParams();
  return <div>SstudentDetails {studentId}</div>;
}
