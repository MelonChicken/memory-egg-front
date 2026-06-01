import { useMemo, useState } from "react";
import "./InventoryPage.css";

const inventoryCategories = [
  {
    id: "background",
    label: "Backgrounds",
    icon: "▱",
  },
  {
    id: "decoration",
    label: "Decorations",
    icon: "⚭",
  },
  {
    id: "music",
    label: "Music",
    icon: "♪",
  },
];

const initialInventoryItems = [
  {
    user_item_id: 1,
    user_id: 1,
    item_id: 1,
    quantity: 1,
    is_equipped: true,
    purchased_at: "2026-05-01",

    name: "Starry Night",
    item_type: "backgrounds",
    description: "A quiet night sky for your egg's resting place.",
    price: 0,
    effect_type: "glow",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 2,
    user_id: 1,
    item_id: 2,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-02",

    name: "Good Morning",
    item_type: "backgrounds",
    description: "A warm morning background filled with soft light.",
    price: 450,
    effect_type: "warmth",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 3,
    user_id: 1,
    item_id: 3,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-03",

    name: "Dreamy Cloud",
    item_type: "backgrounds",
    description: "A gentle cloudy scene for slow reflection.",
    price: 300,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },

  // Extra background test items
  ...Array.from({ length: 9 }, (_, index) => ({
    user_item_id: 100 + index,
    user_id: 1,
    item_id: 100 + index,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-04",

    name: "Test Backgrounds",
    item_type: "backgrounds",
    description: "Test background item for scrolling.",
    price: 100,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  })),

  {
    user_item_id: 4,
    user_id: 1,
    item_id: 4,
    quantity: 1,
    is_equipped: true,
    purchased_at: "2026-05-05",

    name: "Warm Blanket",
    item_type: "decorations",
    description: "A soft blanket that makes the egg feel warmer.",
    price: 120,
    effect_type: "warmth",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 5,
    user_id: 1,
    item_id: 5,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-05",

    name: "Tiny Lamp",
    item_type: "decorations",
    description: "A small lamp that helps the egg glow softly.",
    price: 180,
    effect_type: "glow",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 6,
    user_id: 1,
    item_id: 6,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-06",

    name: "Shell Ribbon",
    item_type: "decorations",
    description: "A decorative ribbon for the egg shell.",
    price: 220,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },

  // Extra decoration test items
  ...Array.from({ length: 9 }, (_, index) => ({
    user_item_id: 200 + index,
    user_id: 1,
    item_id: 200 + index,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-07",

    name: "Test Deco",
    item_type: "decorations",
    description: "Test decoration item for scrolling.",
    price: 80,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  })),

  {
    user_item_id: 7,
    user_id: 1,
    item_id: 7,
    quantity: 1,
    is_equipped: true,
    purchased_at: "2026-05-08",

    name: "Rainy Lullaby",
    item_type: "music",
    description: "A quiet rainy melody for writing memories.",
    price: 250,
    effect_type: "weight",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 8,
    user_id: 1,
    item_id: 8,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-08",

    name: "Morning Piano",
    item_type: "music",
    description: "A calm piano piece for beginning the day.",
    price: 320,
    effect_type: "glow",
    effect_value: 1,
    asset_url: null,
    is_active: true,
  },
  {
    user_item_id: 9,
    user_id: 1,
    item_id: 9,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-09",

    name: "Soft Static",
    item_type: "music",
    description: "A soft ambient track for quiet focus.",
    price: 150,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  },

  // Extra music test items
  ...Array.from({ length: 9 }, (_, index) => ({
    user_item_id: 300 + index,
    user_id: 1,
    item_id: 300 + index,
    quantity: 1,
    is_equipped: false,
    purchased_at: "2026-05-10",

    name: "Test Music",
    item_type: "music",
    description: "Test music item for scrolling.",
    price: 90,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,
  })),
];

function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("backgrounds");
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [selectedUserItemId, setSelectedUserItemId] = useState(1);

  const visibleItems = useMemo(() => {
    return inventoryItems.filter(
      (item) => item.item_type === activeCategory && item.is_active
    );
  }, [activeCategory, inventoryItems]);

  const selectedItem = useMemo(() => {
    const selected = inventoryItems.find(
      (item) => item.user_item_id === selectedUserItemId
    );

    if (selected && selected.item_type === activeCategory && selected.is_active) {
      return selected;
    }

    return visibleItems[0] ?? null;
  }, [activeCategory, inventoryItems, selectedUserItemId, visibleItems]);

  function handleCategoryChange(categoryId) {
    const firstItem = inventoryItems.find(
      (item) => item.item_type === categoryId && item.is_active
    );

    setActiveCategory(categoryId);

    if (firstItem) {
      setSelectedUserItemId(firstItem.user_item_id);
    }
  }

  function handleToggleEquip() {
    if (!selectedItem) {
      return;
    }

    setInventoryItems((currentItems) =>
      currentItems.map((item) => {
        if (item.item_type !== selectedItem.item_type) {
          return item;
        }

        if (item.user_item_id === selectedItem.user_item_id) {
          return {
            ...item,
            is_equipped: !item.is_equipped,
          };
        }

        /*
          Placeholder behavior:
          For now, only one item per category can be equipped at once.

          Later, if decorations can have multiple equipped items,
          this logic can become category-specific.
        */
        if (!selectedItem.is_equipped) {
          return {
            ...item,
            is_equipped: false,
          };
        }

        return item;
      })
    );
  }

  return (
    <main className="app-page inventory-page">
      <header className="inventory-header">
        <div className="inventory-brand">Nacimiento</div>

        <nav className="inventory-nav" aria-label="Main navigation">
          <a href="/nest">⌂ Nest</a>
          <a href="/shop">▣ Shop</a>
        </nav>

        <div className="inventory-user">
          <div className="inventory-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="inventory-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="inventory-window" aria-label="Inventory">
        <header className="inventory-window-header">
          <h1>▰ Inventory</h1>
          <a className="inventory-info-button" href="/nest" aria-label="Return to egg">
            ⊙
          </a>
        </header>

        <div className="inventory-content">
          <aside className="inventory-category-panel" aria-label="Inventory categories">
            {inventoryCategories.map((category) => (
              <button
                key={category.id}
                className={`inventory-category-button ${
                  activeCategory === category.id ? "active" : ""
                }`}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </aside>

          <section className="inventory-item-panel" aria-label="Inventory items">
            <div className="inventory-item-grid">
              {visibleItems.map((item) => (
                <button
                  key={item.user_item_id}
                  className={`inventory-item-card ${
                    selectedItem?.user_item_id === item.user_item_id
                      ? "selected"
                      : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedUserItemId(item.user_item_id)}
                >
                  {item.is_equipped && (
                    <span className="equipped-badge">Equipped</span>
                  )}

                  <div className="inventory-item-image">
                    {item.asset_url ? (
                      <img src={item.asset_url} alt="" />
                    ) : (
                      <span className="inventory-image-placeholder" />
                    )}
                  </div>

                  <div className="inventory-item-info">
                    <div>
                      <strong>{item.name}</strong>

                      {item.quantity > 1 && (
                        <span className="inventory-quantity">
                          x{item.quantity}
                        </span>
                      )}

                      {item.description && (
                        <p className="inventory-item-description">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="inventory-footer">
          <a className="inventory-close-button" href="/nest">
            Close
          </a>

          {selectedItem && (
            <button
              className={`equip-item-button ${
                selectedItem.is_equipped ? "unequip" : ""
              }`}
              type="button"
              onClick={handleToggleEquip}
            >
              {selectedItem.is_equipped ? "Unequip" : "Equip"}
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

export default InventoryPage;