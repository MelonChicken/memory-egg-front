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
  equipped_cosmetic: "flower_crown",

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

function getEmptyStats() {
  return {
    glow: 0,
    warmth: 0,
    weight: 0,
  };
}

function getDecorationStats(decorationItem) {
  const stats = getEmptyStats();

  if (!decorationItem || decorationItem.item_type !== "decoration") {
    return stats;
  }

  if (!decorationItem.effect_type || !decorationItem.effect_value) {
    return stats;
  }

  if (!Object.hasOwn(stats, decorationItem.effect_type)) {
    return stats;
  }

  return {
    ...stats,
    [decorationItem.effect_type]: Number(decorationItem.effect_value),
  };
}

function findEquippedItemByType(inventoryItems, itemType) {
  return inventoryItems.find(
    (item) => item.item_type === itemType && item.is_equipped
  );
}

export async function getEgg() {
  return loadEggFromStorage();
}

export async function recalculateEggFromInventory(inventoryItems) {
  const egg = loadEggFromStorage();

  const equippedBackground = findEquippedItemByType(
    inventoryItems,
    "background"
  );
  const equippedMusic = findEquippedItemByType(inventoryItems, "music");
  const equippedDecoration = findEquippedItemByType(
    inventoryItems,
    "decoration"
  );

  const decorationStats = getDecorationStats(equippedDecoration);

  const updatedEgg = {
    ...egg,
    stage: 1,
    glow: decorationStats.glow,
    warmth: decorationStats.warmth,
    weight: decorationStats.weight,

    active_background_id: equippedBackground?.item_id ?? null,
    active_music_id: equippedMusic?.item_id ?? null,
    active_decoration_id: equippedDecoration?.item_id ?? null,

    equipped_background: equippedBackground?.asset_key || "default",
    selected_music: equippedMusic?.asset_key || null,
    equipped_cosmetic: equippedDecoration?.asset_key || null,

    updated_at: new Date().toISOString(),
  };

  saveEggToStorage(updatedEgg);

  return updatedEgg;
}