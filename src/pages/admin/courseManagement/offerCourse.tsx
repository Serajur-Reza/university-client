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
  useLazyGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import PHSelect from "../../../components/form/PHSelect";
import { daysOptions } from "../../../constants/global";
import dayjs from "dayjs";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { toast } from "sonner";

export default function OfferCourse() {
  const [id, setId] = useState("");
  const [faculties, setFaculties] = useState("");
  const { data: semesterRegistration } =
    useGetAllSemesterRegistrationsQuery(undefined);
  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [getCourseFaculties] = useLazyGetCourseFacultiesQuery();

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

  console.log(courses);

  const coursesOptions = courses?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  console.log("inside parent comp:", id);

  const getCourseFacultiesHandler = async (data) => {
    console.log(data);
    setId(data);
    const res = await getCourseFaculties(data).unwrap();
    const faculties = res?.data?.faculties?.map((item) => {
      return {
        value: item._id,
        label: item.fullName,
      };
    });

    setFaculties(faculties);
  };

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
              onValueChange={(e) => getCourseFacultiesHandler(e)}
              label="Course"
              name="course"
              options={coursesOptions}
            />

            <PHSelect label="Faculty" name="faculty" options={faculties} />

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
