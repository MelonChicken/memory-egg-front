import {
  addUserItem,
  getInventoryItems,
  getUserItems,
} from "./inventoryApi";
import { spendWill } from "./userApi";

const SHOP_ITEMS_STORAGE_KEY = "memory_egg_shop_items";
const TOKEN_STORAGE_KEY = "memory_egg_token";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function shouldUseBackend() {
  return Boolean(getAuthToken());
}

function getAuthHeaders() {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}



const defaultShopItems = [
  {
    item_id: 1,
    name: "Fall Window",
    item_type: "background",
    description: "A calm autumn view outside the egg's window.",
    price: 150,
    effect_type: null,
    effect_value: null,
    asset_key: "fall_bg",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 2,
    name: "Grass Field",
    item_type: "background",
    description: "A peaceful green field for quiet reflection.",
    price: 180,
    effect_type: null,
    effect_value: null,
    asset_key: "grass_bg",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 3,
    name: "Night Street",
    item_type: "background",
    description: "A quiet street scene glowing under the night lights.",
    price: 130,
    effect_type: null,
    effect_value: null,
    asset_key: "nightstreet_bg",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 4,
    name: "Angelic",
    item_type: "decoration",
    description: "A bright angelic halo for your egg.",
    price: 120,
    effect_type: "glow",
    effect_value: "15",
    asset_key: "angelic",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 5,
    name: "Beard",
    item_type: "decoration",
    description: "A dignified beard for a wise-looking egg.",
    price: 100,
    effect_type: "weight",
    effect_value: "10",
    asset_key: "beard",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 6,
    name: "Dirty Boots",
    item_type: "decoration",
    description: "A pair of muddy boots from a long memory walk.",
    price: 110,
    effect_type: "weight",
    effect_value: "12",
    asset_key: "dirty_boots",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 7,
    name: "Flower Crown",
    item_type: "decoration",
    description: "A gentle flower crown that gives the egg warmth.",
    price: 140,
    effect_type: "warmth",
    effect_value: "15",
    asset_key: "flower_crown",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 8,
    name: "Glasses",
    item_type: "decoration",
    description: "Tiny glasses for a thoughtful egg.",
    price: 100,
    effect_type: "glow",
    effect_value: "10",
    asset_key: "glasses",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 9,
    name: "Life Buoy",
    item_type: "decoration",
    description: "A floating ring for memories that need saving.",
    price: 130,
    effect_type: "warmth",
    effect_value: "12",
    asset_key: "life_buoy",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 10,
    name: "On Fire",
    item_type: "decoration",
    description: "A blazing effect for an egg full of energy.",
    price: 180,
    effect_type: "glow",
    effect_value: "20",
    asset_key: "on_fire",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 11,
    name: "Spinning Hat",
    item_type: "decoration",
    description: "A playful spinning hat for a cheerful egg.",
    price: 130,
    effect_type: "warmth",
    effect_value: "10",
    asset_key: "spinning_hat",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 12,
    name: "Top Hat",
    item_type: "decoration",
    description: "A formal top hat for a classy egg.",
    price: 160,
    effect_type: "weight",
    effect_value: "15",
    asset_key: "top_hat",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 13,
    name: "Work Overall",
    item_type: "decoration",
    description: "A hardworking overall for an egg with discipline.",
    price: 170,
    effect_type: "weight",
    effect_value: "18",
    asset_key: "work_overall",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 14,
    name: "Eternity in Moments",
    item_type: "music",
    description: "A quiet track for long memory writing.",
    price: 160,
    effect_type: null,
    effect_value: null,
    asset_key: "eternity_in_moments",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 15,
    name: "Gold Phenomenon",
    item_type: "music",
    description: "A warm background track with a gentle glow.",
    price: 190,
    effect_type: null,
    effect_value: null,
    asset_key: "gold_phenomenon",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 16,
    name: "Mi Querido",
    item_type: "music",
    description: "A soft emotional melody for reflection.",
    price: 100,
    effect_type: null,
    effect_value: null,
    asset_key: "mi_querido",
    asset_url: null,
    is_active: true,
  },
];

function loadShopItemsFromStorage() {
  const savedShopItems = localStorage.getItem(SHOP_ITEMS_STORAGE_KEY);

  if (!savedShopItems) {
    localStorage.setItem(
      SHOP_ITEMS_STORAGE_KEY,
      JSON.stringify(defaultShopItems)
    );

    return defaultShopItems;
  }

  const parsedShopItems = JSON.parse(savedShopItems);

  if (!Array.isArray(parsedShopItems)) {
    localStorage.setItem(
      SHOP_ITEMS_STORAGE_KEY,
      JSON.stringify(defaultShopItems)
    );

    return defaultShopItems;
  }

  return parsedShopItems;
}

// BACKEND INTEGRATION

async function loadShopItemsFromBackend() {
  const response = await fetch(`${API_BASE_URL}/shop/items`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to load shop items.");
  }

  const items = Array.isArray(data) ? data : data?.items;

  return Array.isArray(items) ? items.map(normalizeShopItem) : [];
}

//Helper function
function normalizeItemType(itemType) {
  if (itemType === "cosmetic") {
    return "decoration";
  }

  return itemType;
}

function toDisplayName(assetKey) {
  if (!assetKey) {
    return "Unknown Item";
  }

  return assetKey
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeShopItem(item) {
  const assetKey = item.asset_key || item.name;

  return {
    ...item,
    item_id: item.item_id || item.id,
    id: item.id || item.item_id,
    name: item.display_name || item.title || toDisplayName(assetKey),
    asset_key: assetKey,
    item_type: normalizeItemType(item.item_type),
    price: item.price ?? item.price_will ?? 0,
    is_active: item.is_active === true || item.is_active === 1,
  };
}

//status check

function decorateShopItems(shopItems, userItems) {
  return shopItems.map((shopItem) => {
    const ownedUserItem = userItems.find(
      (userItem) => Number(userItem.item_id) === Number(shopItem.item_id)
    );

    return {
      ...shopItem,
      owned: Boolean(ownedUserItem),
      equipped: Boolean(ownedUserItem?.is_equipped),
      user_item_id: ownedUserItem?.user_item_id ?? null,
    };
  });
}

/* exported api logic */

export async function getRawShopItems() {
  if (shouldUseBackend()) {
    return loadShopItemsFromBackend();
  }

  return loadShopItemsFromStorage();
}

export async function getShopItems() {
  const shopItems = await getRawShopItems();
  const userItems = await getUserItems();

  return decorateShopItems(shopItems, userItems);
}

export async function purchaseShopItem(itemId) {
  const shopItems = loadShopItemsFromStorage();

  const selectedItem = shopItems.find(
    (shopItem) => Number(shopItem.item_id) === Number(itemId)
  );

  if (!selectedItem) {
    throw new Error("Shop item not found.");
  }

  if (!selectedItem.is_active) {
    throw new Error("This item is not available.");
  }

  const userItems = await getUserItems();

  const alreadyOwned = userItems.some(
    (userItem) => Number(userItem.item_id) === Number(itemId)
  );

  if (alreadyOwned) {
    throw new Error("You already own this item.");
  }

  const updatedUser = await spendWill(selectedItem.price);
  await addUserItem(selectedItem.item_id);

  const updatedShopItems = await getShopItems();
  const updatedInventoryItems = await getInventoryItems(shopItems);

  return {
    purchasedItem: selectedItem,
    user: updatedUser,
    shopItems: updatedShopItems,
    inventoryItems: updatedInventoryItems,
  };
}