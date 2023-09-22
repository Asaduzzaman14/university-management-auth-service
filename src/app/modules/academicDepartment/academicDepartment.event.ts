import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentDeletedEvent,
  AcademicDepartmentUpdatedEvent,
} from './academicDepartment.Interface';
import { RedisClient } from '../../../shared/redis';
import { AcademicDepartmentServices } from './academicDepartment.service';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const data: AcademicDepartmentCreatedEvent = JSON.parse(e);
      await AcademicDepartmentServices.insertIntoDBFromEvent(data);
      console.log('data', data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (e: string) => {
      const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);
      await AcademicDepartmentServices.updateOneInDBFromEvent(data);
      console.log('Updated', data);
    }
  );
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    async (e: string) => {
      const data: AcademicDepartmentDeletedEvent = JSON.parse(e);
      await AcademicDepartmentServices.deleteOneFromDBFromEvent(data.id);
    }
  );
};

export default initAcademicDepartmentEvents;
