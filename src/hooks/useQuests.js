import { useCallback, useEffect, useState } from "react";
import {
  checkPostAgainstQuests,
  claimQuestReward,
  getTodayQuests,
} from "../api/questsApi";

export function useQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadQuests = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getTodayQuests();

      setQuests(Array.isArray(data) ? data : []);

      return data;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkPostForQuestCompletion = useCallback(async (post) => {
    setErrorMessage("");

    try {
      const updatedQuests = await checkPostAgainstQuests(post);

      setQuests(Array.isArray(updatedQuests) ? updatedQuests : []);

      return updatedQuests;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }, []);

  const claimQuestForPost = useCallback(async ({ userQuestId, postId }) => {
    setErrorMessage("");

    try {
      const result = await claimQuestReward({ userQuestId, postId });

      const updatedQuests = await getTodayQuests();

      setQuests(Array.isArray(updatedQuests) ? updatedQuests : []);

      return result;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialQuests() {
      setLoading(true);
      setErrorMessage("");

      try {
        const data = await getTodayQuests();

        if (!ignore) {
          setQuests(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
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
    errorMessage,
    reloadQuests,
    checkPostForQuestCompletion,
    claimQuestForPost,
  };
}