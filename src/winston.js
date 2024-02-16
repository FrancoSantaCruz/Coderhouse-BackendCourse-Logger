import winston from "winston";
import config from "./config.js";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `¬ ${timestamp} ~${level} >  ${message} `;
})


// debug, http, info, warning, error, fatal
const customLevel = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'inverse red whiteBG',
        error: 'inverse magenta whiteBG',
        warning: 'inverse yellow whiteBG',
        info: 'bold blue',
        http: 'bold green',
        debug: 'bold gray',
    },
}

export let logger;

if(config.environment === "production"){
    // Logger de production
    logger = winston.createLogger({
        levels: customLevel.levels,
        transports: [
            new winston.transports.File({
                filename: './src/logs/errors.log',
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                ) 
            }),
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevel.colors }),
                    winston.format.timestamp(),
                    customFormat,
                ),
            }),
        ]
    })
} else {
    // Logger de development
    logger = winston.createLogger({
        levels: customLevel.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevel.colors }),
                    winston.format.timestamp(),
                    customFormat,
                ),
            }),
        ]
    })
}