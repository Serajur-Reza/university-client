import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TSemester } from "../../../types";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/courseManagementApi";
import dayjs from "dayjs";
import { useState } from "react";

export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

export default function RegisteredSemesters() {
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemesterRegistrationsQuery(undefined);

  const [updateSemesterStatus] = useUpdateSemesterRegistrationStatusMutation();

  const [semesterId, setSemesterId] = useState("");

  console.log(semesterId);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => {
      return {
        key: _id,
        name: `${academicSemester.name} ${academicSemester.year}`,
        status,
        startDate: dayjs(startDate).format("DD/MM/YYYY"),
        endDate: dayjs(endDate).format("DD/MM/YYYY"),
      };
    }
  );
  const handleStatusUpdate = (data) => {
    console.log("semesterId:", semesterId);
    console.log("newStatus:", data.key);

    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateSemesterStatus(updateData);
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParams[] = [];

  //       console.log(queryParams);
  //       setParams(queryParams);
  //     }
  //   };

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
    </div>
  );
}
