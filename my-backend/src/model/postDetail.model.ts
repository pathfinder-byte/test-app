import { PostModel } from "./post.model";

export interface PostDetailModel extends PostModel {
  content: string;
}
