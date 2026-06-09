import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "../api/userApi";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadUser = useCallback(async () => {
    setLoading(true);

    const data = await getCurrentUser();

    setUser(data);
    setLoading(false);

    return data;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialUser() {
      setLoading(true);

      try {
        const data = await getCurrentUser();

        if (!ignore) {
          setUser(data);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    function handleUserUpdated() {
      reloadUser();
    }

    loadInitialUser();

    window.addEventListener("memory-egg:user-updated", handleUserUpdated);

    return () => {
      ignore = true;
      window.removeEventListener("memory-egg:user-updated", handleUserUpdated);
    };
  }, [reloadUser]);

  return {
    user,
    loading,
    reloadUser,
  };
}