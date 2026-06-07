import { useCallback, useEffect, useState } from "react";
import {
  checkPostAgainstQuests,
  claimQuestReward,
  getTodayQuests,
} from "../api/questsApi";

export function useQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadQuests = useCallback(async () => {
    setLoading(true);

    const data = await getTodayQuests();

    setQuests(Array.isArray(data) ? data : []);
    setLoading(false);

    return data;
  }, []);

  const checkPostForQuestCompletion = useCallback(async (post) => {
    const updatedQuests = await checkPostAgainstQuests(post);

    setQuests(Array.isArray(updatedQuests) ? updatedQuests : []);

    return updatedQuests;
  }, []);

  const claimReward = useCallback(async (questId) => {
    await claimQuestReward(questId);

    const updatedQuests = await getTodayQuests();

    setQuests(Array.isArray(updatedQuests) ? updatedQuests : []);

    return updatedQuests;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialQuests() {
      const data = await getTodayQuests();

      if (!ignore) {
        setQuests(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    }

    loadInitialQuests();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    quests,
    loading,
    reloadQuests,
    checkPostForQuestCompletion,
    claimReward,
  };
}