import { useState } from "react";
import { Button, Flex, Modal, Table, TableColumnsType } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetAllOfferedCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";

export default function OfferedCourses() {
  const [params, setParams] = useState([]);

  const [formData, setFormData] = useState();

  const {
    data: offeredCourses,
    isLoading,
    isFetching,
  } = useGetAllOfferedCoursesQuery(params);

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const { data: faculties } = useGetAllFacultiesQuery(undefined);

  const { data: academicDepartments } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const coursesData = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  // const offeredCoursesData = offeredCourses?.data?.map((item) => ({
  //   value: item._id,
  //   label: "123",
  // }));

  console.log(offeredCourses?.data?.result);

  const onChange = (_pagination, filters, _sorter, extra) => {
    console.log("params", filters, extra);

    if (extra.action === "filter") {
      const queryParams = [];
      filters.academicFaculty?.forEach((element) => {
        queryParams.push({ name: "academicFaculty[_id]", value: element });
      });

      console.log(queryParams);
      setParams(queryParams);
    }
  };

  const tableData = offeredCourses?.data?.result?.map((item) => ({
    key: item._id,
    name: courses?.find((elem) => elem._id === item?.course),
    // academicFacultyName: item.academicFaculty.name,
    // academicFacultyId: item.academicFaculty._id,
  }));

  const academicDepartmentsFilter = academicDepartments?.data?.map((item) => ({
    text: item.name,
    value: item._id,
  }));

  const columns: TableColumnsType = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Departments",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
      filters: academicDepartmentsFilter,
    },

    // {
    //   title: "Academic Departments",
    //   key: "academicDepartment",
    //   dataIndex: "academicDepartment",
    //   filters: academicDepartmentsFilter,
    // },
    // {
    //   title: "Academic Departments",
    //   key: "academicDepartment",
    //   dataIndex: "academicDepartment",
    //   filters: academicDepartmentsFilter,
    // },
    // {
    //   title: "Academic Departments",
    //   key: "academicDepartment",
    //   dataIndex: "academicDepartment",
    //   filters: academicDepartmentsFilter,
    // },
    // {
    //   title: "Action",
    //   key: "X",
    //   render: (index, record) => {
    //     return <Button onClick={() => showModal(record)}>Update</Button>;
    //   },
    // },
  ];

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        onChange={onChange}
      />

      {/* <Modal
        title="Update Academic Semester"
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <PHForm onSubmit={onSubmit} defaultValues={formData}>
          <PHInput type={"text"} name={"name"} label="Name"></PHInput>
          <PHSelect
            name={"academicFacultyId"}
            label="Academic Faculty"
            options={offeredCoursesData}
          ></PHSelect>

          <Flex justify="flex-end" align="flex-start">
            <Button htmlType="submit">Update</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Flex>
        </PHForm>
      </Modal> */}
    </div>
  );
}
