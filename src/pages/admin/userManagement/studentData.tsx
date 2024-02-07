import { useState } from "react";

import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TStudent } from "../../../types";
import {
  useBlockUserMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagementApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNumber"
>;

export default function StudentData() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const [studentId, setStudentId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const [blockStudent] = useBlockUserMutation();

  console.log(studentData);

  const meta = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNumber, user }) => {
      return {
        key: _id,
        fullName,
        id,
        email,
        contactNumber,
        user: user._id,
      };
    }
  );

  const blockStudentHandler = async () => {
    const toastId = toast.loading("blocking...");
    try {
      const result = await blockStudent({
        id: studentId,
        data: {
          status: "blocked",
        },
      });
      if (result?.error) {
        throw new Error(result?.error?.data?.message);
      }
      toast.success("Successfully blocked student", {
        id: toastId,
        duration: 2000,
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const openModal = (record) => {
    setIsModalOpen(true);
    setStudentId(record);
    console.log(record);
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Roll Number",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact Number",
      key: "contactNumber",
      dataIndex: "contactNumber",
    },

    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.user}`}>
              <Button>Details</Button>
            </Link>

            <Button>Update</Button>
            <Button onClick={() => openModal(item.user)}>Block</Button>
          </Space>
        );
      },
      width: "1%",
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
        onChange={onChange}
        loading={isFetching}
        pagination={false}
      />

      <Pagination
        current={page}
        total={meta?.total}
        pageSize={meta?.limit}
        onChange={(value) => setPage(value)}
      />

      <Modal
        destroyOnClose
        centered
        title="Block Student"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={blockStudentHandler}
      >
        Are you sure you want to block the student
      </Modal>
    </div>
  );
}
