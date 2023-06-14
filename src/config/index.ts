import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defaultStudentPassword: process.env.DEFAULT_STUDENT_PASSWORD,
};
