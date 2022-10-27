import createError from "http-errors";
import { verifyToken } from "./auth";

export const logErrors = (err,req,res,next) => {
    res.status(err.statusCode || 500).json({error: err})
};

export const checkIfIsAutenticated = async (req,res,next) => {
    try {
        if (req.query.hasOwnProperty("access_token")) {
          req.headers.authorization = `Bearer ${req.query.access_token}`
        }
      
        if (req.query && typeof req.headers.authorization === "undefined") {
          req.headers.authorization = `Bearer ${req.cookies.access_token}`
        }
      
        const access_token = req.headers.authorization.split(' ')[1];
      
        await verifyToken(access_token);
      
        next();
    } catch(err) {
        next(createError(401))
    }
};