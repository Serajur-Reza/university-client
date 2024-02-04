import React from "react";
import PHForm from "./../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";

export default function CreateAcademicFaculty() {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    try {
      const result = await createAcademicFaculty(data);
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
    <Flex justify="center" align="middle">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type={"text"} name={"name"} label="Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
