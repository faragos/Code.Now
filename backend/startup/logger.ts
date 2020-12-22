import * as winston from 'winston';

const consoleTransport = new winston.transports.Console()

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
  ),
  level: 'info',
  transports: [consoleTransport],
});

export default logger;