import { PostModel } from "./Post";

export interface PostDetailModel extends PostModel {
  content: string;
}
