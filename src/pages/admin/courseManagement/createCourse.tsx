import { Button, Flex, Col } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { TResponse } from "../../../types";

export default function CreateCourse() {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useCreateCourseMutation();

  const preRequisiteCoursesOptions = courses?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  console.log(preRequisiteCoursesOptions);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    console.log(data);

    const courseData = {
      ...data,
      code: Number(data.code),
      credit: Number(data.credit),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item) => {
            return {
              course: item,
              isDeleted: false,
            };
          })
        : [],
    };
    console.log(courseData);

    try {
      const result = (await addCourse(courseData)) as TResponse<any>;
      console.log("result", result);
      if (result.error) {
        throw new Error(result?.error?.data?.message);
      }

      toast.success("course succesfully added", {
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
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="Prefix" />
            <PHInput type="number" name="code" label="Code" />
            <PHInput type="number" name="credit" label="Credit" />
            <PHSelect
              name={"preRequisiteCourses"}
              label={"Pre Requisite Courses"}
              options={preRequisiteCoursesOptions}
              mode="multiple"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
}
