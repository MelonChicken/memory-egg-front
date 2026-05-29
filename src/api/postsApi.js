/* NOTE: THIS FILE WILL BE REPLACED WITH FETCH() CALLS.
   LOGICS SHOULD BE IMPLEMENTED IN BACKEND. */

import { mockPosts } from "./mockData";

function countWords(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

/*(Will Reward per post) = wordCount / 10 */
function calculateWillReward(wordCount) {
  return Math.max(1, Math.floor(wordCount / 10));
}

export async function getAllPosts() {
  return mockPosts;
}

export async function getPostById(postId) {
  return mockPosts.find((post) => post.post_id === Number(postId));
}

export async function createPost(postData) {
  const wordCount = countWords(postData.content);

  const newPost = {
    post_id: Date.now(),
    user_id: 1,
    title: postData.title,
    content: postData.content,
    image_url: postData.image_url || null,
    tag: postData.tag || "reflection",
    visibility: postData.visibility,
    word_count: wordCount,
    will_reward: calculateWillReward(wordCount),
    created_at: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString().slice(0, 10),
  };

  mockPosts.unshift(newPost);

  return newPost;
}