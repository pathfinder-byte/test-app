import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PostModel } from "../model/Post";

const PostByTag = ({ tag }: { tag: string }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  const fetchPostByTag = useCallback(async () => {
    try {
      const response = await axios.get<PostModel[]>(
        `http://localhost:3005/api/posts/tags/${tag}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [tag]);

  useEffect(() => {
    fetchPostByTag();
  }, [fetchPostByTag]);

  return (
    <div>
      <h1>Post tagged with "{tag}"</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostByTag;
