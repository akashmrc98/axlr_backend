import multer from "multer";

const upload = multer({ dest: "/data" });

const multerUpload = upload.single("file");

export default multerUpload;
