import { useCallback, useEffect, useState } from "react";
import { getRawShopItems } from "../api/shopApi";
import {
  equipUserItem,
  getInventoryItems,
  unequipUserItem,
} from "../api/inventoryApi";

export function useInventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadInventory = useCallback(async () => {
    setLoading(true);

    const rawShopItems = await getRawShopItems();
    const items = await getInventoryItems(rawShopItems);

    setShopItems(Array.isArray(rawShopItems) ? rawShopItems : []);
    setInventoryItems(Array.isArray(items) ? items : []);
    setLoading(false);

    return {
      shopItems: Array.isArray(rawShopItems) ? rawShopItems : [],
      inventoryItems: Array.isArray(items) ? items : [],
    };
  }, []);

  const equipItem = useCallback(async (userItemId) => {
    setErrorMessage("");

    try {
      const rawShopItems = await getRawShopItems();

      await equipUserItem(userItemId, rawShopItems);

      const updatedInventoryItems = await getInventoryItems(rawShopItems);

      setShopItems(Array.isArray(rawShopItems) ? rawShopItems : []);
      setInventoryItems(
        Array.isArray(updatedInventoryItems) ? updatedInventoryItems : []
      );

      return updatedInventoryItems;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }, []);

  const unequipItem = useCallback(async (userItemId) => {
    setErrorMessage("");

    try {
      await unequipUserItem(userItemId);

      const rawShopItems = await getRawShopItems();
      const updatedInventoryItems = await getInventoryItems(rawShopItems);

      setShopItems(Array.isArray(rawShopItems) ? rawShopItems : []);
      setInventoryItems(
        Array.isArray(updatedInventoryItems) ? updatedInventoryItems : []
      );

      return updatedInventoryItems;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialInventory() {
      setLoading(true);

      const rawShopItems = await getRawShopItems();
      const items = await getInventoryItems(rawShopItems);

      if (!ignore) {
        setShopItems(Array.isArray(rawShopItems) ? rawShopItems : []);
        setInventoryItems(Array.isArray(items) ? items : []);
        setLoading(false);
      }
    }

    loadInitialInventory();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    inventoryItems,
    shopItems,
    loading,
    errorMessage,
    equipItem,
    unequipItem,
    reloadInventory,
  };
}