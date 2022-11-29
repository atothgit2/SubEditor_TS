import express from "express";
import controller from "./controller";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("file"), controller.uploadFile);
router.get("/file", controller.getFileList);
router.get("/file/:id", controller.getFileContent);
router.put("/file/:id", controller.editFileContent);
router.delete("/file/:id", controller.deleteFile);

export = router;
