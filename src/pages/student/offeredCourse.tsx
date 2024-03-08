import {
  useEnrollCourseMutation,
  useGetAllMyOfferedCoursesQuery,
} from "../../redux/features/student/studentManagementApi";
import { Button, Row, Col } from "antd";

type TCourse = {
  [index: string]: any;
};

export default function OfferedCourse() {
  const { data: myOfferedCourseData } =
    useGetAllMyOfferedCoursesQuery(undefined);

  const [enrollCourse] = useEnrollCourseMutation();

  const singleObject = myOfferedCourseData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedObject = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (data) => {
    const enrollData = {
      offeredCourse: data,
    };
    const result = enrollCourse(enrollData);
    console.log(result);
  };

  if (!modifiedObject.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedObject.map((item) => (
        <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
          <div style={{ padding: "10px" }}>
            <h2>{item.courseTitle}</h2>
          </div>

          <div>
            {item.sections.map((section) => (
              <Row
                justify={"space-between"}
                align={"middle"}
                style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
              >
                <Col span={5}>Section : {section.section}</Col>
                <Col span={5}>
                  Days :{" "}
                  {section.days.map((day) => (
                    <span> {day} </span>
                  ))}
                </Col>
                <Col span={5}>Start Time : {section.startTime}</Col>
                <Col span={5}>End Time : {section.endTime}</Col>
                <Col span={4}>
                  <Button onClick={() => handleEnroll(section._id)}>
                    Enroll
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
}
