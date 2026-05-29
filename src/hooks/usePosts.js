import { useEffect, useState } from "react";
import { createPost, getAllPosts } from "../api/postsApi";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    setLoading(true);

    const data = await getAllPosts();

    setPosts(data);
    setLoading(false);
  }

  async function addPost(postData) {
    const newPost = await createPost(postData);

    setPosts((prevPosts) => [newPost, ...prevPosts]);

    return newPost;
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    addPost,
    reloadPosts: loadPosts,
  };
}