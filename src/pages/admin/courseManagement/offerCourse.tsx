import PHForm from "../../../components/form/PHForm";
import { Flex, Col, Button, TimePicker } from "antd";
import PHInput from "../../../components/form/PHInput";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import PHSelectWatch from "../../../components/form/PHSelectWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import PHSelect from "../../../components/form/PHSelect";
import { daysOptions } from "../../../constants/global";
import dayjs from "dayjs";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { toast } from "sonner";

export default function OfferCourse() {
  const [id, setId] = useState("");
  const { data: semesterRegistration } =
    useGetAllSemesterRegistrationsQuery(undefined);
  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData, isFetching: fetchFaculties } =
    useGetCourseFacultiesQuery(id, { skip: !id });

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item) => {
      return {
        value: item._id,
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      };
    }
  );

  const academicFacultyOptions = academicFaculty?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const coursesOptions = courses?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  console.log("Fjklfad", facultiesData);

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => {
    return {
      value: item._id,
      label: item.fullName,
    };
  });

  console.log("inside parent comp:", id);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("creating...");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.section),
      section: Number(data.section),
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
    };

    try {
      const result = await addOfferedCourse(offeredCourseData);
      if (result?.error) {
        throw new Error(result?.error?.data?.message);
      }
      toast.success("Successfully created offerd course", {
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
    <>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label="Semester Registration"
              name="semesterRegistration"
              options={semesterRegistrationOptions}
            />

            <PHSelect
              label="Academic Department"
              name="academicDepartment"
              options={academicDepartmentOptions}
            />

            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            />

            <PHSelectWatch
              onValueChange={(e) => setId(e)}
              label="Course"
              name="course"
              options={coursesOptions}
            />

            <PHSelect
              disabled={!id || fetchFaculties}
              label="Faculty"
              name="faculty"
              options={facultiesOptions}
            />

            <PHInput
              type={"number"}
              name={"maxCapacity"}
              label="Max Capacity"
            />

            <PHInput type={"number"} name={"section"} label="Section" />
            <PHSelect
              label="Days"
              name="days"
              options={daysOptions}
              mode="multiple"
            />

            <PHTimePicker label="Start Time" name="startTime" />

            <PHTimePicker label="End Time" name="endTime" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </>
  );
}
