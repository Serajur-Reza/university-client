import React from "react";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyManagementAPI";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const { data: facultyCourses } = useGetAllFacultyCoursesQuery(undefined);

  const semesterOptions = facultyCourses?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCourses?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <Flex justify="center" align="middle">
      <Col span={6}>
        {" "}
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label={"Semester"}
            options={semesterOptions}
          />
          <PHSelect name="course" label={"Course"} options={courseOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
