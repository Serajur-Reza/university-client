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
import { TQueryParams, TAdmin } from "../../../types";
import {
  useBlockUserMutation,
  useGetAllAdminsQuery,
} from "../../../redux/features/admin/userManagementApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<
  TAdmin,
  "fullName" | "id" | "email" | "contactNumber"
>;

export default function AdminData() {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const [adminId, setAdminId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetAllAdminsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const [blockAdmin] = useBlockUserMutation();

  console.log(adminData);

  const meta = adminData?.meta;

  const tableData = adminData?.data?.map(
    ({ _id, fullName, id, email, contactNumber, user }) => {
      return {
        key: _id,
        fullName,
        id,
        email,
        contactNumber,
        user: user,
      };
    }
  );

  const blockAdminHandler = async () => {
    const toastId = toast.loading("blocking...");
    try {
      const result = await blockAdmin({
        id: adminId,
        data: {
          status: "blocked",
        },
      });
      if (result?.error) {
        throw new Error(result?.error?.data?.message);
      }
      toast.success("Successfully blocked admin", {
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
    setAdminId(record);
    console.log(record);
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "User ID",
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
            <Link to={`/admin/admin-data/${item.user}`}>
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
        title="Block Admin"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={blockAdminHandler}
      >
        Are you sure you want to block the admin
      </Modal>
    </div>
  );
}
