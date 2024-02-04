import { Button, Flex, Col } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthsOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((item) => ({
  value: String(currentYear + item),
  label: String(currentYear + item),
}));

export default function CreateAcademicSemester() {
  const [createSemester] = useCreateAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    try {
      const name = semesterOptions[Number(data?.name) - 1]?.label;
      const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };
      console.log(semesterData);
      const result = (await createSemester(semesterData)) as TResponse;
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
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect label="Name" name="name" options={semesterOptions} />
            <PHSelect label="Year" name="year" options={yearOptions} />
            <PHSelect
              label="Start Month"
              name="startMonth"
              options={monthsOptions}
            />
            <PHSelect
              label="End Month"
              name="endMonth"
              options={monthsOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
}
