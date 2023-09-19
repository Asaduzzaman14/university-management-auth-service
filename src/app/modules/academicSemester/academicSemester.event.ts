import { RedisClient } from './../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemister.constant';

const initAcademicSemester = () => {
  RedisClient.subscrive(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);
  });
};

export default initAcademicSemester;
