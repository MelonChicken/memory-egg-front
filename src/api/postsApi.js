const STORAGE_KEY = "memory_egg_posts";

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


/* localStorage for testing WritePostPage and MemoryARchivePage interaction */

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

export async function getAllPosts() {
  return loadPostsFromStorage();
}

export async function getPostById(postId) {
  const posts = loadPostsFromStorage();

  return posts.find((post) => post.post_id === Number(postId));
}

export async function createPost(postData) {
  const posts = loadPostsFromStorage();
  const wordCount = countWords(postData.content);

  const newPost = {
    post_id: Date.now(),
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

export async function deletePost(postId) {
  const posts = loadPostsFromStorage();
  /*
  console.log("Before delete:", posts);
  console.log("Trying to delete postId:", postId);
  */
  const updatedPosts = posts.filter(
    (post) => Number(post.post_id) !== Number(postId)
  );
  /*
  console.log("After delete:", updatedPosts);
  */
  savePostsToStorage(updatedPosts);

  return true;
}