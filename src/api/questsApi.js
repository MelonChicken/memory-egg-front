import { addWill } from "./userApi";

const QUEST_STORAGE_KEY = "memory_egg_quests";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("memory_egg_token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function shouldUseBackend() {
  return Boolean(localStorage.getItem("memory_egg_token"));
}

const defaultQuests = [
  {
    user_quest_id: 1,
    quest_id: 1,
    user_id: 1,
    title: "Write a Study Memory",
    description: "Write one post with the study tag.",
    quest_type: "post_tag",
    required_tag: "study",
    required_word_count: 0,
    required_image: 0,
    reward_will: 10,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
  },
  {
    user_quest_id: 2,
    quest_id: 2,
    user_id: 1,
    title: "A Small Reflection",
    description: "Write a reflection post with at least 20 words.",
    quest_type: "post_tag_word_count",
    required_tag: "reflection",
    required_word_count: 20,
    required_image: 0,
    reward_will: 15,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
  },
  {
    user_quest_id: 3,
    quest_id: 3,
    user_id: 1,
    title: "Capture a Memory",
    description: "Write any post with an image attached.",
    quest_type: "image",
    required_tag: null,
    required_word_count: 0,
    required_image: 1,
    reward_will: 20,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
  },
];

function loadQuestsFromStorage() {
  const savedQuests = localStorage.getItem(QUEST_STORAGE_KEY);

  if (!savedQuests) {
    localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(defaultQuests));
    return defaultQuests;
  }

  const parsedQuests = JSON.parse(savedQuests);

  if (!Array.isArray(parsedQuests)) {
    localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(defaultQuests));
    return defaultQuests;
  }

  return parsedQuests;
}

function saveQuestsToStorage(quests) {
  localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(quests));
}

function doesPostCompleteQuest(post, quest) {
  if (!post || !quest) {
    return false;
  }

  const questType = quest.quest_type;
  const postTag = post.tag;
  const requiredTag = quest.required_tag;
  const postWordCount = Number(post.word_count || 0);
  const requiredWordCount = Number(quest.required_word_count || 0);
  const hasImage = Boolean(post.image_url);

  if (questType === "post_tag") {
    return postTag === requiredTag;
  }

  if (questType === "word_count") {
    return postWordCount >= requiredWordCount;
  }

  if (questType === "image") {
    return hasImage;
  }

  if (questType === "post_tag_image") {
    return postTag === requiredTag && hasImage;
  }

  if (questType === "post_tag_word_count") {
    return postTag === requiredTag && postWordCount >= requiredWordCount;
  }

  return false;
}

export async function getTodayQuests() {
  if (!shouldUseBackend()) {
    return loadQuestsFromStorage();
  }

  const response = await fetch(`${API_BASE_URL}/quests/today`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to load today's quests.");
  }

  return response.json();
}



/* API logic to be replaced by backend */

export async function checkPostAgainstQuests(post) {
  const quests = loadQuestsFromStorage();

  const updatedQuests = quests.map((quest) => {
    if (quest.status !== "assigned") {
      return quest;
    }

    if (!doesPostCompleteQuest(post, quest)) {
      return quest;
    }

    return {
      ...quest,
      status: "completed",
      completed_post_id: post.post_id || post.id,
      completed_at: new Date().toISOString(),
    };
  });

  saveQuestsToStorage(updatedQuests);

  return updatedQuests;
}

export async function claimQuestReward({ userQuestId, postId }) {
  if (!shouldUseBackend()) {
    const quests = loadQuestsFromStorage();

    const selectedQuest = quests.find(
      (quest) => Number(quest.user_quest_id) === Number(userQuestId)
    );

    if (!selectedQuest) {
      throw new Error("Quest not found.");
    }

    if (selectedQuest.status === "claimed") {
      throw new Error("Quest has already been claimed.");
    }

    const updatedQuests = quests.map((quest) => {
      if (Number(quest.user_quest_id) !== Number(userQuestId)) {
        return quest;
      }

      return {
        ...quest,
        status: "claimed",
        completed_post_id: postId,
        completed_at: new Date().toISOString().slice(0, 10),
      };
    });

    saveQuestsToStorage(updatedQuests);

    const updatedUser = await addWill(selectedQuest.reward_will);

    return {
      userQuest: {
        ...selectedQuest,
        status: "claimed",
        completed_post_id: postId,
        completed_at: new Date().toISOString().slice(0, 10),
      },
      user: updatedUser,
      reward_will: selectedQuest.reward_will,
    };
  }

  const response = await fetch(`${API_BASE_URL}/quests/${userQuestId}/claim`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      post_id: postId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to claim quest.");
  }

  return response.json();
}