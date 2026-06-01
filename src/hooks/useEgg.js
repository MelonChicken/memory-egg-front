import { useCallback, useEffect, useState } from "react";
import { getEgg, recalculateEggFromInventory } from "../api/eggApi";

export function useEgg() {
  const [egg, setEgg] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadEgg = useCallback(async () => {
    setLoading(true);

    const data = await getEgg();

    setEgg(data);
    setLoading(false);

    return data;
  }, []);

  const recalculateFromInventory = useCallback(async (inventoryItems) => {
    const updatedEgg = await recalculateEggFromInventory(inventoryItems);

    setEgg(updatedEgg);

    return updatedEgg;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialEgg() {
      const data = await getEgg();

      if (!ignore) {
        setEgg(data);
        setLoading(false);
      }
    }

    loadInitialEgg();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    egg,
    loading,
    reloadEgg,
    recalculateFromInventory,
  };
}