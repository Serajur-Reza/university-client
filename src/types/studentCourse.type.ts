export interface TOfferedCourse {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitedFulfilled: boolean;
  isAlreadyEnrolled: boolean;
}

export interface TCourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourses: any[];
  __v: string;
}
