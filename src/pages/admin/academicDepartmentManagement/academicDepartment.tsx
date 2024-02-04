import { useState } from "react";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
  useUpdateAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagementApi";
import { Button, Col, Flex, Modal, Table, TableColumnsType } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import PHSelect from "../../../components/form/PHSelect";

export default function AcademicDepartment() {
  const [params, setParams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState();

  const { data: academicDepartments, isFetching } =
    useGetAllAcademicDepartmentsQuery(params);

  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);

  const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();

  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyData = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const showModal = (data) => {
    console.log(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const { key, name, academicFacultyId } = data;
    const toastId = toast.loading("creating...");

    const result = await updateAcademicDepartment({
      id: key,
      data: { name, academicFaculty: academicFacultyId },
    });
    if (result?.error) {
      throw new Error(result?.error?.data?.message);
    }
    toast.success("academic department updated added", {
      id: toastId,
      duration: 2000,
    });
    try {
    } catch (error) {
      toast.error(err.message || "something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
    setIsModalOpen(false);
  };

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

  const tableData = academicDepartments?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    academicFacultyName: item.academicFaculty.name,
    academicFacultyId: item.academicFaculty._id,
  }));

  const academicFacultyFilter = academicFaculty?.data.map((item) => ({
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
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFacultyName",
      filters: academicFacultyFilter,
    },
    {
      title: "Action",
      key: "X",
      render: (index, record) => {
        return <Button onClick={() => showModal(record)}>Update</Button>;
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        onChange={onChange}
      />

      <Modal
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
            options={academicFacultyData}
          ></PHSelect>

          <Flex justify="flex-end" align="flex-start">
            <Button htmlType="submit">Update</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Flex>
        </PHForm>
      </Modal>
    </div>
  );
}
