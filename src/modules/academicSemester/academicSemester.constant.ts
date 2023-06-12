import { Code, Month, Title } from './academicSemester.interface';

const months: Month[] = [
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
const code: Code[] = ['01', '02', '03'];
const title: Title[] = ['Autumn', 'Summer', 'Fall'];

const academicSemesterTitileCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const paginationOptionList = ['page', 'limit', 'sortBy', 'sortOrder'];

const academicSemesterFilterList = ['year', 'code', 'title'];

export {
  academicSemesterFilterList,
  academicSemesterTitileCodeMapper,
  code,
  months,
  paginationOptionList,
  title,
};
