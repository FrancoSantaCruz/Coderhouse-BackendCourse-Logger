import { generateAllProducts } from '../faker.js';
import CustomError from '../errors/error.js';
import { ErrorMessages } from '../errors/error.enum.js';
import { logger } from '../winston.js';

export const mockingProducts = async (req, res, next) => {
    try {
        const products = generateAllProducts(100);
        res.status(200).json({ message: "Fake products generated.", products });
    } catch (error) {
        next(error)
    }
}

export const loggerTest = async (req, res, next) => {
    try {
        logger.fatal("Logger fatal.");
        logger.error("Logger error.");
        logger.warning("Logger warning.");
        logger.info("Logger info.");
        logger.http("Logger http.");
        logger.debug("Logger debug.");
        
        res.send("Probando los custom loggers de winston 🤠")
    } catch (error) {
        next(error)
    }
}