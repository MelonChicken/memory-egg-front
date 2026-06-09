import { getRawShopItems } from "./shopApi";
import { getInventoryItems } from "./inventoryApi";

const EGG_STORAGE_KEY = "memory_egg_egg";

const defaultEgg = {
  egg_id: 1,
  user_id: 1,
  stage: 1,
  glow: 0,
  warmth: 0,
  weight: 0,

  active_background_id: null,
  active_music_id: null,
  active_decoration_id: null,

  equipped_background: "default",
  selected_music: null,
  equipped_cosmetic: null,

  updated_at: new Date().toISOString(),
};

function loadEggFromStorage() {
  const savedEgg = localStorage.getItem(EGG_STORAGE_KEY);

  if (!savedEgg) {
    localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(defaultEgg));
    return defaultEgg;
  }

  const parsedEgg = JSON.parse(savedEgg);

  if (!parsedEgg || typeof parsedEgg !== "object") {
    localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(defaultEgg));
    return defaultEgg;
  }

  return {
    ...defaultEgg,
    ...parsedEgg,
    stage: 1,
  };
}

function saveEggToStorage(egg) {
  localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(egg));
}

function findEquippedItemByType(inventoryItems, itemType) {
  return inventoryItems.find(
    (item) => item.item_type === itemType && item.is_equipped
  );
}

export async function getEgg() {
  try {
    const rawShopItems = await getRawShopItems();
    const inventoryItems = await getInventoryItems(rawShopItems);

    return recalculateEggFromInventory(inventoryItems);
  } catch (error) {
    console.warn("Failed to sync egg from inventory:", error);
    return loadEggFromStorage();
  }
}

export async function recalculateEggFromInventory(inventoryItems) {
  const currentEgg = loadEggFromStorage();

  const equippedBackground = findEquippedItemByType(
    inventoryItems,
    "background"
  );
  const equippedMusic = findEquippedItemByType(inventoryItems, "music");
  const equippedDecoration = findEquippedItemByType(
    inventoryItems,
    "decoration"
  );

  const bonusStats = inventoryItems.reduce(
    (totals, item) => {
      if (!item.is_equipped || !item.effect_type || item.effect_value == null) {
        return totals;
      }

      const effectValue = Number(item.effect_value);

      if (Number.isNaN(effectValue)) {
        return totals;
      }

      if (!["glow", "warmth", "weight"].includes(item.effect_type)) {
        return totals;
      }

      return {
        ...totals,
        [item.effect_type]: totals[item.effect_type] + effectValue,
      };
    },
    {
      glow: 0,
      warmth: 0,
      weight: 0,
    }
  );

  const baseGlow = currentEgg.base_glow ?? currentEgg.glow ?? 0;
  const baseWarmth = currentEgg.base_warmth ?? currentEgg.warmth ?? 0;
  const baseWeight = currentEgg.base_weight ?? currentEgg.weight ?? 0;


  const updatedEgg = {
    ...currentEgg,

    base_glow: baseGlow,
    base_warmth: baseWarmth,
    base_weight: baseWeight,

    glow: Math.min(100, baseGlow + bonusStats.glow),
    warmth: Math.min(100, baseWarmth + bonusStats.warmth),
    weight: Math.min(100, baseWeight + bonusStats.weight),

    equipped_background: equippedBackground?.asset_key || "default",
    selected_music: equippedMusic?.asset_key || null,
    equipped_cosmetic: equippedDecoration?.asset_key || null,
  };

  saveEggToStorage(updatedEgg);

  return updatedEgg;
}