import { IAcademicSemesterCreatedEvent } from './academicSemester.Interface';
import { RedisClient } from './../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemister.constant';
import { AcademicSemesterService } from './academicSemister.service';

const initAcademicSemester = () => {
  RedisClient.subscrive(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
  });

  RedisClient.subscrive(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterService.updateSemesterFromEvent(data);
  });

  RedisClient.subscrive(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterService.deleteSemesterEvent(data.id);
    console.log(data, 'data deleted');
  });
};

export default initAcademicSemester;
