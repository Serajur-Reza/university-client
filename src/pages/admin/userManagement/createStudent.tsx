import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";

const studentData = {
  name: {
    firstName: "Steve",
    middleName: "Michael",
    lastName: "Doe",
  },
  gender: "male",
  // dateOfBirth: "1998-05-15",
  email: "student2@example.com",
  contactNumber: "12345678",
  emergencyContactNo: "987-654-3210",
  bloodGroup: "O+",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Elm Street, Town",
  guardian: {
    fatherName: "David Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Emily Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },
  localGuardian: {
    name: "Michael Smith",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Oak Avenue, Suburb",
  },

  admissionSemester: "65b9350c93ce6163196ad63c",
  academicDepartment: "65b92ff0734ea56920176f16",
};

function CreateStudent() {
  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined, { skip: sIsLoading });

  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log("info:", { data, error });

  const semesterOptions = sData?.data?.map((item) => {
    return {
      value: item._id,
      label: String(item.name + " " + item.year),
    };
  });

  const departmentOptions = dData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "S12345",
      student: data,
    };
    console.log(studentData);

    const formData = new FormData();
    formData.append("file", data.profileImg);
    formData.append("data", JSON.stringify(studentData));
    console.log(formData);
    addStudent(formData);

    //just for checking
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentData}>
          <Row gutter={6}>
            <Divider>Personal Info</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"name.firstName"}
                label="First Name"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"name.middleName"}
                label="Middle Name"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput type={"text"} name={"name.lastName"} label="Last Name" />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                name={"gender"}
                label="Gender"
                options={genderOptions}
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHDatePicker name={"dateOfBirth"} label="Date Of Birth" />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                name={"bloodGroup"}
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>

            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    ></Input>
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Row gutter={6}>
            <Divider>Contact Info</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput type={"text"} name={"email"} label="Email" />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput type={"text"} name={"contactNumber"} label="Contactr" />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"emergencyContactNo"}
                label="Emergency Contact"
              />
            </Col>

            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"presentAddress"}
                label="Present Address"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"permanentAddress"}
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Row gutter={6}>
            <Divider>Guardian</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.fatherName"}
                label="Father's Name"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.fatherOccupation"}
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.fatherContactNo"}
                label="Father's ContactNo"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.motherName"}
                label="Mother's Name"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.motherOccupation"}
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"guardian.motherContactNo"}
                label="Mother's ContactNo"
              />
            </Col>
          </Row>

          <Row gutter={6}>
            <Divider>Personal Info</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput type={"text"} name={"localGuardian.name"} label="Name" />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"localGuardian.occupation"}
                label="Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"localGuardian.contactNo"}
                label="Contact"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHInput
                type={"text"}
                name={"localGuardian.address"}
                label="Address"
              />
            </Col>
          </Row>

          <Row gutter={6}>
            <Divider>Acadmic Info</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                disabled={sIsLoading}
                name={"admissionSemester"}
                label="Admission Semester"
                options={semesterOptions}
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                disabled={dIsLoading}
                options={departmentOptions}
                name={"academicDepartment"}
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}

export default CreateStudent;
