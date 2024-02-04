import { Button, Col, Flex } from "antd";

import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import PHSelect from "../../../components/form/PHSelect";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";

export default function CreateAcademicDepartment() {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();

  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyData = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  console.log(academicFaculties);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    try {
      const result = await createAcademicDepartment(data);
      if (result?.error) {
        throw new Error(result?.error?.data?.message);
      }
      toast.success("Successfully created academic faculty", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(error?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Flex align="middle" justify="center">
      <Col span={6}>
        {" "}
        <PHForm onSubmit={onSubmit}>
          <PHInput type={"text"} name={"name"} label="Name"></PHInput>
          <PHSelect
            name={"academicFaculty"}
            label={"Academic Faculty"}
            options={academicFacultyData}
          />

          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
