import { verifyToken } from "./auth.service";
import { Unathorized } from "../utils/http-error/http-error";
import { User } from "../api/user/user.model";

export const authorization = async (req, res, next) => {

console.log(req.headers.authorization)

    try {
        if (req.query.access_tokken) {
            req.headers.authorization = `Bearer ${req.query.access_tokken}`;
        };

        if (typeof req.headers.authorization === "undefined") {
            req.header.authorization = `Bearer ${req.cookies.access_tokken}`;
        };

        const access_tokken = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(access_tokken);

        req.user = await User.get(decoded.sub);

        if(!req.user) {
            throw new Error ("User was not found in the database");
        };

        next()

    } catch (err) {
        console.log(err);
        next(err);
    }
}