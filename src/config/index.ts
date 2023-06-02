import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defaultStudentPassword: process.env.DEFAULT_STUDENT_PASSWORD,
};
