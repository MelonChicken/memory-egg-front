const STORAGE_KEY = "memory_egg_posts";
const TOKEN_STORAGE_KEY = "memory_egg_token";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const defaultPosts = [
  {
    post_id: 1,
    user_id: 1,
    title: "The First Crack",
    content:
      "This morning, I found a tiny crack on the surface of the egg. Is it a sign that my will is starting to take shape?",
    image_url: null,
    tag: "growth",
    visibility: "public",
    word_count: 24,
    will_reward: 12,
    created_at: "2026-05-29",
    updated_at: "2026-05-29",
  },
  {
    post_id: 2,
    user_id: 1,
    title: "Study Day",
    content:
      "I studied React today. Hooks are still confusing, but I am starting to understand how state controls the page.",
    image_url: null,
    tag: "study",
    visibility: "private",
    word_count: 19,
    will_reward: 10,
    created_at: "2026-05-29",
    updated_at: "2026-05-29",
  },
];

function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function shouldUseBackend() {
  return Boolean(getAuthToken());
}

function getAuthHeaders() {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/* localStorage for mock mode */

function loadPostsFromStorage() {
  const savedPosts = localStorage.getItem(STORAGE_KEY);

  if (!savedPosts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    return defaultPosts;
  }

  const parsedPosts = JSON.parse(savedPosts);

  if (!Array.isArray(parsedPosts)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    return defaultPosts;
  }

  return parsedPosts;
}

function savePostsToStorage(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function countWords(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

function calculateWillReward(wordCount) {
  return Math.max(1, Math.floor(wordCount / 10));
}

function normalizePost(post) {
  if (!post) {
    return null;
  }

  return {
    ...post,
    post_id: post.post_id || post.id,
    id: post.id || post.post_id,
  };
}

export async function getAllPosts() {
  if (!shouldUseBackend()) {
    return loadPostsFromStorage();
  }

  // BACKEND INTEGRATION

  const response = await fetch(`${API_BASE_URL}/posts/all`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => null);

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to load posts.");
  }

  const posts = Array.isArray(data) ? data : data?.posts;

  return Array.isArray(posts) ? posts.map(normalizePost) : [];
}

export async function getPostById(postId) {
  if (!shouldUseBackend()) {
    const posts = loadPostsFromStorage();

    return posts.find((post) => Number(post.post_id) === Number(postId));
  }

  // BACKEND INTEGRATION

  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to load post.");
  }

  return normalizePost(data.post || data);
}

export async function createPost(postData) {
  if (!shouldUseBackend()) {
    const posts = loadPostsFromStorage();
    const wordCount = countWords(postData.content);

    const newPost = {
      post_id: Date.now(),
      id: Date.now(),
      user_id: 1,
      title: postData.title,
      content: postData.content,
      image_url: postData.image_url || null,
      tag: postData.tag,
      visibility: postData.visibility,
      word_count: wordCount,
      will_reward: calculateWillReward(wordCount),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];

    savePostsToStorage(updatedPosts);

    return newPost;
  }

  // BACKEND INTEGRATION

  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: postData.title,
      content: postData.content,
      image_url: postData.image_url || null,
      tag: postData.tag?.toLowerCase(),
      visibility: postData.visibility,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to create post.");
  }

  return normalizePost(data.post || data);
}

export async function deletePost(postId) {
  if (!shouldUseBackend()) {
    const posts = loadPostsFromStorage();

    const updatedPosts = posts.filter(
      (post) => Number(post.post_id) !== Number(postId)
    );

    savePostsToStorage(updatedPosts);

    return true;
  }

  // BACKEND INTEGRATION

  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || data?.message || "Failed to delete post.");
  }

  return true;
}