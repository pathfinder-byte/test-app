import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PostDetailModel } from "../model/PostDetail";
import { Container, Typography } from "@mui/material";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState<PostDetailModel>();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get<PostDetailModel>(
        `http://localhost:3005/api/posts/${id}`,
        { withCredentials: true }
      );

      setPostDetail(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (!postDetail) return <div>Loading...</div>;
  return (
    <Container>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {postDetail.title}
      </Typography>
      <Typography
        variant="body2"
        color="textPrimary"
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      ></Typography>
      <Typography variant="body2" color="textPrimary">
        Posted by: {postDetail.postedBy} on{" "}
        {new Date(postDetail.postedAt).toDateString()}
      </Typography>
      <Typography variant="body2" color="textPrimary" gutterBottom>
        Tags {postDetail.tags.join(",")}
      </Typography>
    </Container>
  );
};

export default PostDetail;
