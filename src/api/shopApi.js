import {
  addUserItem,
  getInventoryItems,
  getUserItems,
} from "./inventoryApi";
import { spendWill } from "./userApi";

const SHOP_ITEMS_STORAGE_KEY = "memory_egg_shop_items";

const defaultShopItems = [
  {
    item_id: 1,
    name: "Starry Night",
    item_type: "background",
    description: "A quiet night sky for your egg's resting place.",
    price: 150,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 2,
    name: "Good Morning",
    item_type: "background",
    description: "A warm morning background filled with soft light.",
    price: 180,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 3,
    name: "Dreamy Cloud",
    item_type: "background",
    description: "A gentle cloudy scene for slow reflection.",
    price: 130,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 4,
    name: "Warm Blanket",
    item_type: "decoration",
    description: "A soft blanket that gives the egg warmth.",
    price: 120,
    effect_type: "warmth",
    effect_value: "15",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 5,
    name: "Tiny Lamp",
    item_type: "decoration",
    description: "A small lamp that helps the egg glow softly.",
    price: 180,
    effect_type: "glow",
    effect_value: "15",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 6,
    name: "Shell Ribbon",
    item_type: "decoration",
    description: "A decorative ribbon that gives the egg weight.",
    price: 220,
    effect_type: "weight",
    effect_value: "15",
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 7,
    name: "Rainy Lullaby",
    item_type: "music",
    description: "A quiet rainy melody for writing memories.",
    price: 160,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 8,
    name: "Morning Piano",
    item_type: "music",
    description: "A calm piano piece for beginning the day.",
    price: 190,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },
  {
    item_id: 9,
    name: "Soft Static",
    item_type: "music",
    description: "A soft ambient track for quiet focus.",
    price: 100,
    effect_type: null,
    effect_value: null,
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
  return loadShopItemsFromStorage();
}

export async function getShopItems() {
  const shopItems = loadShopItemsFromStorage();
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