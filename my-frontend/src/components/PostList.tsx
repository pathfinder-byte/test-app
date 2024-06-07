import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PostModel } from "../model/Post";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
const PostList = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get<PostModel[]>(
        "http://localhost:3005/api/posts",
        {
          params: { search, sort },
          withCredentials: true,
        }
      );

      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [search, sort]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts List
      </Typography>
      <TextField
        label="Search"
        fullWidth
        margin="normal"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="postedBy">Posted By</option>
      </select> */}
      <TextField
        label="Sort by"
        select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="postedBy">Posted By</MenuItem>
      </TextField>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            alignItems="flex-start"
            component={Link}
            to={`/posts/${post.id}`}
          >
            <ListItemText
              primary={post.title}
              secondary={
                <>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component={"span"}
                  >
                    Posted by: {post.postedBy} on{" "}
                    {new Date(post.postedAt).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component={"span"}
                  >
                    Tags: {post.tags.join(", ")}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostList;
