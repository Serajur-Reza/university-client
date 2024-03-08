import React from "react";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentManagementApi";
import { Row, Col } from "antd";

export default function MySchedule() {
  const { data: myEnrolledCourses } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(myEnrolledCourses);
  return (
    <Row gutter={[0, 20]}>
      {myEnrolledCourses?.data?.map((item) => (
        <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
          {/* <div style={{ padding: "10px" }}>
            <h2>{item.course.title}</h2>
          </div>

          <div>
            {item.offeredCourse.days.map((day) => (
              <span> {day} </span>
            ))}
          </div> */}

          <div>
            {myEnrolledCourses?.data?.map((item) => (
              <Row
                justify={"space-between"}
                align={"middle"}
                style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
              >
                <Col span={5}>Section : {item.course.title}</Col>
                <Col span={5}>Section : {item.offeredCourse.section}</Col>
                <Col span={5}>
                  Days :{" "}
                  {item.offeredCourse.days.map((day) => (
                    <span> {day} </span>
                  ))}
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
}
