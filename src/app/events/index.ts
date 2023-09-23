import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.event';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.event';
import initAcademicSemester from '../modules/academicSemester/academicSemester.event';

const subscriveToEvents = () => {
  initAcademicSemester();
  initAcademicDepartmentEvents();
  initAcademicFacultyEvents();
};

export default subscriveToEvents;
