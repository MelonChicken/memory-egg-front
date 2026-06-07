const USER_ITEMS_STORAGE_KEY = "memory_egg_user_items";
const USER_ID = 1;

function loadUserItemsFromStorage() {
  const savedUserItems = localStorage.getItem(USER_ITEMS_STORAGE_KEY);

  if (!savedUserItems) {
    localStorage.setItem(USER_ITEMS_STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  const parsedUserItems = JSON.parse(savedUserItems);

  if (!Array.isArray(parsedUserItems)) {
    localStorage.setItem(USER_ITEMS_STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  return parsedUserItems;
}

function saveUserItemsToStorage(userItems) {
  localStorage.setItem(USER_ITEMS_STORAGE_KEY, JSON.stringify(userItems));
}

function buildInventoryView(userItem, shopItem) {
  return {
    user_item_id: userItem.user_item_id,
    user_id: userItem.user_id,
    item_id: userItem.item_id,
    quantity: userItem.quantity,
    is_equipped: userItem.is_equipped,
    purchased_at: userItem.purchased_at,

    name: shopItem.name,
    item_type: shopItem.item_type,
    description: shopItem.description,
    price: shopItem.price,
    effect_type: shopItem.effect_type,
    effect_value: shopItem.effect_value,
    asset_url: shopItem.asset_url,
    is_active: shopItem.is_active,
  };
}

/* exported api logics*/

export async function getUserItems() {
  return loadUserItemsFromStorage();
}

export async function getInventoryItems(shopItems) {
  const userItems = loadUserItemsFromStorage();

  return userItems
    .map((userItem) => {
      const matchingShopItem = shopItems.find(
        (shopItem) => Number(shopItem.item_id) === Number(userItem.item_id)
      );

      if (!matchingShopItem) {
        return null;
      }

      return buildInventoryView(userItem, matchingShopItem);
    })
    .filter(Boolean);
}

export async function addUserItem(itemId) {
  const userItems = loadUserItemsFromStorage();

  const existingUserItem = userItems.find(
    (userItem) => Number(userItem.item_id) === Number(itemId)
  );

  if (existingUserItem) {
    const updatedUserItems = userItems.map((userItem) => {
      if (Number(userItem.item_id) !== Number(itemId)) {
        return userItem;
      }

      return {
        ...userItem,
        quantity: userItem.quantity + 1,
      };
    });

    saveUserItemsToStorage(updatedUserItems);

    return updatedUserItems;
  }

  const newUserItem = {
    user_item_id: Date.now(),
    user_id: USER_ID,
    item_id: Number(itemId),
    quantity: 1,
    is_equipped: false,
    purchased_at: new Date().toISOString(),
  };

  const updatedUserItems = [newUserItem, ...userItems];

  saveUserItemsToStorage(updatedUserItems);

  return updatedUserItems;
}

export async function equipUserItem(userItemId, shopItems) {
  const userItems = loadUserItemsFromStorage();

  const selectedUserItem = userItems.find(
    (userItem) => Number(userItem.user_item_id) === Number(userItemId)
  );

  if (!selectedUserItem) {
    throw new Error("Inventory item not found.");
  }

  const selectedShopItem = shopItems.find(
    (shopItem) => Number(shopItem.item_id) === Number(selectedUserItem.item_id)
  );

  if (!selectedShopItem) {
    throw new Error("Shop item data not found.");
  }

  const selectedItemType = selectedShopItem.item_type;

  const updatedUserItems = userItems.map((userItem) => {
    const relatedShopItem = shopItems.find(
      (shopItem) => Number(shopItem.item_id) === Number(userItem.item_id)
    );

    if (!relatedShopItem || relatedShopItem.item_type !== selectedItemType) {
      return userItem;
    }

    return {
      ...userItem,
      is_equipped:
        Number(userItem.user_item_id) === Number(selectedUserItem.user_item_id),
    };
  });

  saveUserItemsToStorage(updatedUserItems);

  return updatedUserItems;
}

export async function unequipUserItem(userItemId) {
  const userItems = loadUserItemsFromStorage();

  const updatedUserItems = userItems.map((userItem) => {
    if (Number(userItem.user_item_id) !== Number(userItemId)) {
      return userItem;
    }

    return {
      ...userItem,
      is_equipped: false,
    };
  });

  saveUserItemsToStorage(updatedUserItems);

  return updatedUserItems;
}