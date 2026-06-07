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
      const data = await getCurrentUser();

      if (!ignore) {
        setUser(data);
        setLoading(false);
      }
    }

    loadInitialUser();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    user,
    loading,
    reloadUser,
  };
}