import express from "express";
import path from 'path';
import multer from "multer";

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpe?g|png|webp/;
    const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimeType = file.mimetype

    if (fileTypes.test(extname) && mimeTypes.test(mimeType)) {
        cb(null, true)
    } else {
        cb(new Error("Images Only"), false);
    }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.route('/').post((req, res) => {
    uploadSingleImage(req, res, (error) => {
        if (error) {
            res.status(400).send({ message: error.message })
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded success",
                image: `/${req.file.path}`,
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    })
})
export default router