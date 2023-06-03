import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  return `${timestamp} [${label}] ${level}: ${message} : ${date.toDateString()}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'INFO' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/app/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.File({
      filename: 'logs/winston/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/winston/info.log',
      level: 'info',
    }),
  ],
});

export default logger;
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
