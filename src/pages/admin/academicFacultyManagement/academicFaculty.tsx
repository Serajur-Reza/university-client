import React from "react";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { Button, Table, TableColumnsType } from "antd";
import { TTableData } from "../academicSemesterManagement/academicSemester";

export default function AcademicFaculty() {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  console.log(facultyData);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "X",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];
  return (
    <Table columns={columns} dataSource={tableData} loading={isFetching} />
  );
}
