import fsPromises from "fs/promises";
import { readFile } from "node:fs/promises";

const fileName: string = "test1.srt";
const fileLocation = "./src/app/resources"; // "The relative path to a filename can be used. Remember, however, that this path will be relative to process.cwd()."

interface fileMetaData {
  filename: string;
  title?: string;
  imdbscore?: number;
};

const listFiles = async (fileLocation: string) => {
  try {
    // directory path
    const dir = "./src/app/resources";
    const files = await fsPromises.readdir(fileLocation);

    // files object contains all files names
    // log them on console
    files.forEach((file) => {
      console.log(file);
    });
  } catch (err) {
    console.error(err);
  }
};

const readAFile = async (fileName: string, fileLocation: string) => {
  try {
    const contents = await readFile(`${fileLocation}/${fileName}`, {
      encoding: "utf-8",
    });
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
};

listFiles(fileLocation);
readAFile(fileName, fileLocation);
