import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const createLogger = (level: string) => {
  return winston.createLogger({
    level: level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new DailyRotateFile({
        filename: `${level}-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        dirname: 'logs',
        level: level,
      }),
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
};

export const infoLogger = createLogger('info');
export const errorLogger = createLogger('error');
