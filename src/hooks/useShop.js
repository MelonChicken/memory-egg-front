import { useCallback, useEffect, useState } from "react";
import { getShopItems, purchaseShopItem } from "../api/shopApi";
import { getCurrentUser } from "../api/userApi";

export function useShop() {
  const [shopItems, setShopItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadShop = useCallback(async () => {
    setLoading(true);

    const [items, currentUser] = await Promise.all([
      getShopItems(),
      getCurrentUser(),
    ]);

    setShopItems(Array.isArray(items) ? items : []);
    setUser(currentUser);
    setLoading(false);

    return {
      shopItems: Array.isArray(items) ? items : [],
      user: currentUser,
    };
  }, []);

  const purchaseItem = useCallback(
    async (itemId) => {
      setErrorMessage("");

      try {
        const result = await purchaseShopItem(itemId);

        const refreshed = await reloadShop();

        window.dispatchEvent(new Event("memory-egg:user-updated"));

        return {
          ...result,
          shopItems: refreshed.shopItems,
          user: refreshed.user,
        };
      } catch (error) {
        setErrorMessage(error.message);
        throw error;
      }
    },
    [reloadShop]
  );

  useEffect(() => {
    let ignore = false;

    async function loadInitialShop() {
      setLoading(true);

      const [items, currentUser] = await Promise.all([
        getShopItems(),
        getCurrentUser(),
      ]);

      if (!ignore) {
        setShopItems(Array.isArray(items) ? items : []);
        setUser(currentUser);
        setLoading(false);
      }
    }

    loadInitialShop();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    shopItems,
    user,
    loading,
    errorMessage,
    purchaseItem,
    reloadShop,
  };
}