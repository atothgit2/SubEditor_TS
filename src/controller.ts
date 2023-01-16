import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { getFileList } from "../../SERVICE/src/service"

export interface MetaData {
  title: String;
  imdbscore: Number;
}

// // CREATE
// const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
//   let file = req.file;
//   let metadata = JSON.stringify(req.body);

//   console.log(file);
//   console.log(metadata);

//   renameFile(
//     `uploads/${req.file?.filename}`,
//     `uploads/${req.file?.filename}.srt`
//   );
//   createFile(`uploads/${req.file?.filename}.json`, `${metadata}`);

//   res.status(200).send(`Succesfull upload!`);
// };

// GET ALL
const listFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
      let data = getFileList()
      res.status(200).send(data);
    
  } catch (error) {
    console.log(error);
  }
};

// GET ONE W/ CONTENT
// TODO: if I send wrong id in the url, the complete server dies and need to restart
const getFileContent = async (req: Request,res: Response, next: NextFunction) => {
  let id: string = req.params.id;

  fs.readFile(
    path.join(__dirname, "..", "..", "uploads", id),
    "utf8",
    (err, data) => {
      if (err) throw err;
      res.status(200).send(data);
    }
  );
};

// PUT ONE (MODIFY FILE CONTENT)
const editFileContent = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;
  let body = req.body;
  // console.log(body);

  fs.writeFile(path.join(__dirname, "..", "..", "uploads", `${id}.srt`), body, function (err) {
      if (err) throw err;
      console.log('Replaced!');
    });
  res.status(200).send("Done!");
};

// PUT METADATA (MODIFY METADATA)
const editMetaData  = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;
  let body = JSON.stringify(req.body); 
  console.log(body);
  console.log(typeof body);

  fs.writeFile(path.join(__dirname, "..", "..", "uploads", `${id}.json`), body, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
  res.status(200).send("Done!");
}

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;

  fs.rm(
    path.join(__dirname, "..", "..", "uploads", id),
    { recursive: true },
    (err) => {
      if (err) throw err;
      console.log("File removed!");
      res.status(200).send("File removed!");
    }
  );
};

export default {
  listFiles,
  getFileContent,
  editFileContent,
  editMetaData,
  deleteFile,
};
