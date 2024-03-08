import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyManagementAPI";
import { Button, Modal, Table } from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { type } from "./../../redux/store";

export default function MyStudents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState();

  const { registrationSemesterId, courseId } = useParams();

  const { data: facultyCourses } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registrationSemesterId },
    { name: "course", value: courseId },
  ]);

  const [addMark] = useAddMarkMutation();

  const showModal = (data) => {
    console.log(data);
    setStudentInfo(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    const courseMarks = {
      classTest1: Number(data.classTest1),
      classTest2: Number(data.classTest2),
      midTerm: Number(data.midTerm),
      finalTerm: Number(data.finalTerm),
    };

    const marksData = {
      semesterRegistration: studentInfo?.semesterRegistration,
      student: studentInfo?.student,
      offeredCourse: studentInfo?.offeredCourse,
      courseMarks,
    };
    console.log(marksData);

    const res = await addMark(marksData);
    console.log(res);
  };

  const tableData = facultyCourses?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => {
      return {
        key: _id,
        name: student.fullName,
        id: student.id,
        semesterRegistration: semesterRegistration._id,
        student: student._id,
        offeredCourse: offeredCourse._id,
      };
    }
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Role",
      key: "Roll",
      dataIndex: "Roll",
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return <Button onClick={() => showModal(item)}>Update</Button>;
      },
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={tableData} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        centered
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="number" name={"classTest1"} label="Class Test 1" />
          <PHInput type="number" name={"classTest2"} label="Class Test 2" />
          <PHInput type="number" name={"midTerm"} label="Mid Term" />
          <PHInput type="number" name={"finalTerm"} label="Final Term" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
}
