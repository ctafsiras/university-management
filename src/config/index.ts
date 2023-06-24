import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defaultStudentPassword: process.env.DEFAULT_STUDENT_PASSWORD,
  defaultFacultyPassword: process.env.DEFAULT_FACULTY_PASSWORD,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  bcryptSalt: process.env.BCRYPT_SALT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
