import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { renameFile, createFile } from "../utils/utils";

interface Post { // TO BE DELETED!
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

export interface MetaData {
  title: String;
  imdbscore: Number
}

const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  let file = req.file;
  let metadata = JSON.stringify(req.body);
  
  console.log(file);
  console.log(metadata);

renameFile(`uploads/${req.file?.filename}`, `uploads/${req.file?.filename}.srt`)
createFile(`uploads/${req.file?.filename}.json`, `${metadata}`)

    res.status(200).send(`Succesfull upload!`);
};

// reading files with 'fs': https://bobbyhadz.com/blog/typescript-import-use-fs-module

// SAMPLES, TO BE REMOVED!
// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  let posts: [Post] = result.data;
  return res.status(200).json({
    message: posts,
  });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  // get the post
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  let post: Post = result.data;
  return res.status(200).json({
    message: post,
  });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let title: string = req.body.title ?? null;
  let body: string = req.body.body ?? null;
  // update the post
  let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      ...(title && { title }),
      ...(body && { body }),
    }
  );
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id;
  // delete the post
  let response: AxiosResponse = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  // return response
  return res.status(200).json({
    message: "post deleted successfully",
  });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let title: string = req.body.title;
  let body: string = req.body.body;
  // add the post
  let response: AxiosResponse = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    {
      title,
      body,
    }
  );
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

export default {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addPost,
  uploadFiles,
};
