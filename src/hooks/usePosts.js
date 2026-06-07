import { useCallback, useEffect, useState } from "react";
import { createPost, deletePost, getAllPosts } from "../api/postsApi";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    addPost,
    removePost,
    reloadPosts,
  };
}