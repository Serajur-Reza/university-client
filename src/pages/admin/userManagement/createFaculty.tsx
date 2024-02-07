import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";

import { useAddFacultyMutation } from "../../../redux/features/admin/userManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";
import { designationOptions } from "../../../constants/designation";

const facultyData = {
  name: {
    firstName: "John",
    middleName: "Daniel",
    lastName: "Doe",
  },
  designation: "lecturer",
  gender: "male",
  // dateOfBirth: "1998-05-15",
  email: "johndoe1@example.com",
  contactNumber: "123-456-7890",
  emergencyContactNo: "987-654-3210",
  bloodGroup: "O+",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Elm Street, Town",
  academicDepartment: "65b92ff0734ea56920176f16",
};

function CreateFaculty() {
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);
  const [addFaculty, { data, error }] = useAddFacultyMutation();
  console.log("info:", { data, error });

  const departmentOptions = dData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "S12345",
      faculty: data,
    };
    console.log(facultyData);

    const formData = new FormData();
    formData.append("file", data.profileImg);
    formData.append("data", JSON.stringify(facultyData));
    console.log(formData);
    addFaculty(formData);

    //just for checking
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyData}>
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
            <Divider>Acadmic Info</Divider>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                disabled={dIsLoading}
                options={departmentOptions}
                name={"academicDepartment"}
                label="Academic Department"
              />
            </Col>
            <Col span={24} lg={{ span: "8" }} md={{ span: "12" }}>
              <PHSelect
                options={designationOptions}
                name={"designation"}
                label="Designation"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}

export default CreateFaculty;
