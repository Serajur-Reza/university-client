import { Button, Flex, Col } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { semesterStatusOptions } from "../../../constants/semester";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";
import { TResponse } from "../../../types";

export default function SemesterRegistration() {
  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  const [addSemester] = useCreateSemesterRegistrationMutation();

  const academicSemesterOptions = academicSemester?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.name} ${item.year}`,
    };
  });

  console.log(academicSemesterOptions);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const semesterData = {
      ...data,
      maxCredit: Number(data.maxCredit),
      minCredit: Number(data.minCredit),
    };
    console.log(semesterData);

    try {
      const result = (await addSemester(semesterData)) as TResponse<any>;
      console.log("result", result);
      if (result.error) {
        throw new Error(result?.error?.data?.message);
      }

      toast.success("semester succesfully added", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
      toast.error(err.message || "something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label="Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            />

            <PHSelect
              label="Status"
              name="status"
              options={semesterStatusOptions}
            />
            <PHDatePicker label="Start Date" name="startDate" />

            <PHDatePicker label="End Date" name="endDate" />

            <PHInput type="number" label="Min Credit" name="minCredit" />

            <PHInput type="number" label="Max Credit" name="maxCredit" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
}
