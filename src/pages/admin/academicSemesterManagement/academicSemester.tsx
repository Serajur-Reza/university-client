import { useState } from "react";

import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester, TQueryParams } from "../../../types";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "code" | "startMonth" | "endMonth"
>;

export default function AcademicSemester() {
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicSemestersQuery(params);

  console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => {
      return {
        key: _id,
        name,
        year,
        startMonth,
        endMonth,
      };
    }
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
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
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters?.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      console.log(queryParams);
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isFetching}
      />
    </div>
  );
}
