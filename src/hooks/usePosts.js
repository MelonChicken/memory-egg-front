import { useCallback, useEffect, useState } from "react";
import { createPost, deletePost, getAllPosts, getPostById } from "../api/postsApi";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadPosts = useCallback(async () => {
    setLoading(true);

    const data = await getAllPosts();

    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);

    return data;
  }, []);

  const addPost = useCallback(async (postData) => {
    const newPost = await createPost(postData);
    const updatedPosts = await getAllPosts();

    /*setPosts((prevPosts) => [newPost, ...prevPosts]);*/
    setPosts(Array.isArray(updatedPosts) ? updatedPosts : []);

    return {
      newPost,
      updatedPosts: Array.isArray(updatedPosts) ? updatedPosts : [],
    };
  }, []);

  const removePost = useCallback(async (postId) => {
    await deletePost(postId);

    setPosts((prevPosts) =>
      prevPosts.filter((post) => Number(post.post_id) !== Number(postId))
    );

    return true;
  }, []);

  const getPost = useCallback(async (postId) => {
    setErrorMessage("");

    try {
      return await getPostById(postId);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load post.");
      throw error;
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialPosts() {
      setLoading(true);

      const data = await getAllPosts();

      if (!ignore) {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    }

    loadInitialPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    posts,
    loading,
    errorMessage,
    addPost,
    removePost,
    getPost,
    reloadPosts,
  };
}