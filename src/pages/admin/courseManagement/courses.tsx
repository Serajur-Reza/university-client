import { Button, Modal, Row, Table, TableColumnsType } from "antd";
import { TSemester } from "../../../types";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";

export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

export default function Courses() {
  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();
  console.log(facultiesData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleCourse, setSingleCourse] = useState();

  // const [updateSemesterStatus] = useUpdateSemesterRegistrationStatusMutation();

  // const [semesterId, setSemesterId] = useState("");

  console.log(courses);

  const tableData = courses?.data?.map(({ _id, title, code }) => {
    return {
      key: _id,
      title,
      code,
    };
  });

  const facultiesOptions = facultiesData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.fullName,
    };
  });

  const showModal = (data) => {
    console.log(data);
    setSingleCourse(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    const facultyData = {
      id: singleCourse?.key,
      data,
    };
    await addFaculties(facultyData);
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return <Button onClick={() => showModal(item)}>Assign Faculty</Button>;
      },
    },
  ];

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        loading={isFetching}
      />

      <Modal
        title="Assign Faculty"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <p>easy</p>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            name="faculties"
            label="Faculties"
            options={facultiesOptions}
          />
          <Row justify={"end"}>
            <Button htmlType="submit">Submit</Button>
          </Row>
        </PHForm>
      </Modal>
    </div>
  );
}
