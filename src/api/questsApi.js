import { addWill } from "./userApi";

const QUEST_STORAGE_KEY = "memory_egg_quests";

const defaultQuests = [
  {
    quest_id: 1,
    title: "Write a Study Memory",
    description: "Write one post with the study tag.",
    quest_type: "tag",
    required_tag: "study",
    required_word_count: 1,
    requires_image: false,
    reward_will: 10,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
    claimed_at: null,
  },
  {
    quest_id: 2,
    title: "A Small Reflection",
    description: "Write a reflection post with at least 20 words.",
    quest_type: "word_count",
    required_tag: "reflection",
    required_word_count: 20,
    requires_image: false,
    reward_will: 15,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
    claimed_at: null,
  },
  {
    quest_id: 3,
    title: "Capture a Memory",
    description: "Write any post with an image attached.",
    quest_type: "image",
    required_tag: null,
    required_word_count: 1,
    requires_image: true,
    reward_will: 20,
    status: "assigned",
    assigned_date: new Date().toISOString().slice(0, 10),
    completed_post_id: null,
    completed_at: null,
    claimed_at: null,
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
  const tagMatches = !quest.required_tag || post.tag === quest.required_tag;

  const wordCountMatches =
    !quest.required_word_count ||
    post.word_count >= quest.required_word_count;

  const imageMatches = !quest.requires_image || Boolean(post.image_url);

  return tagMatches && wordCountMatches && imageMatches;
}

export async function getTodayQuests() {
  return loadQuestsFromStorage();
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
      completed_post_id: post.post_id,
      completed_at: new Date().toISOString(),
    };
  });

  saveQuestsToStorage(updatedQuests);

  return updatedQuests;
}

export async function claimQuestReward(questId) {
  const quests = loadQuestsFromStorage();

  const selectedQuest = quests.find(
    (quest) => Number(quest.quest_id) === Number(questId)
  );

  if (!selectedQuest) {
    throw new Error("Quest not found.");
  }

  if (selectedQuest.status !== "completed") {
    throw new Error("Quest is not completed yet.");
  }

  const updatedQuests = quests.map((quest) => {
    if (Number(quest.quest_id) !== Number(questId)) {
      return quest;
    }

    return {
      ...quest,
      status: "claimed",
      claimed_at: new Date().toISOString(),
    };
  });
    saveQuestsToStorage(updatedQuests);

    const updatedUser = await addWill(selectedQuest.reward_will);

    return {
    reward_will: selectedQuest.reward_will,
    user: updatedUser,
    };
}