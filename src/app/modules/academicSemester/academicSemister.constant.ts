import {
  IAcademicSemesterTitles,
  IAcademicSemisterCodes,
} from './academicSemester.Interface';
import { IAcademicSemesterMonths } from './academicSemester.Interface';

export const academicSemesterTitls: IAcademicSemesterTitles[] = [
  'Autum',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMonthes: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchingFields = ['title', 'code', 'year'];

export const academicSemesterFiltareableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.crated';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.updated';
