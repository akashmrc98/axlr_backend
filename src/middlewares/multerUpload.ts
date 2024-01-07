import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const multerUpload = upload.single("file");

export default multerUpload;
