import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        res.status(404).send(`Invalid object of : ${req.params.id}`);
        next();
    }
}
export default checkId;