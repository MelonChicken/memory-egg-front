import { useMemo, useState } from "react";
import "./ShopPage.css";

const shopCategories = [
  {
    id: "backgrounds",
    label: "Backgrounds",
    icon: "▱",
  },
  {
    id: "decorations",
    label: "Decorations",
    icon: "⚭",
  },
  {
    id: "music",
    label: "Music",
    icon: "♪",
  },
];

const shopItems = [
  {
    item_id: 1,
    name: "Starry Night",
    item_type: "backgrounds",
    description: "A quiet night sky for your egg's resting place.",
    price: 0,
    effect_type: "glow",
    effect_value: 1,
    asset_url: null,
    is_active: true,

    // Temporary frontend-only mock fields.
    owned: true,
    equipped: true,
  },
  {
    item_id: 2,
    name: "Good Morning",
    item_type: "backgrounds",
    description: "A warm morning background filled with soft light.",
    price: 450,
    effect_type: "warmth",
    effect_value: 1,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 3,
    name: "Dreamy Cloud",
    item_type: "backgrounds",
    description: "A gentle cloudy scene for slow reflection.",
    price: 300,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 4,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 5,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 6,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 7,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 8,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 9,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 10,
    name: "Test Item",
    item_type: "backgrounds",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 11,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: true,
    equipped: false,
  },
  {
    item_id: 12,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 13,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 14,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 15,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 16,
    name: "Test Deco",
    item_type: "decorations",
    description: "Wow! a shop!",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 17,
    name: "Test Music",
    item_type: "music",
    description: "Music is life",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: true,

    owned: false,
    equipped: false,
  },
  {
    item_id: 18,
    name: "Invisible music",
    item_type: "music",
    description: "You shouldn't be able to see me.",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: false,

    owned: false,
    equipped: false,
  },
  {
    item_id: 17,
    name: "Invisible deco",
    item_type: "decorations",
    description: "You shouldn't be able to see me.",
    price: 999,
    effect_type: null,
    effect_value: null,
    asset_url: null,
    is_active: false,

    owned: false,
    equipped: false,
  },
];

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("backgrounds");
  const [selectedItemId, setSelectedItemId] = useState(1);

  const visibleItems = useMemo(() => {
    return shopItems.filter(
      (item) => item.item_type === activeCategory && item.is_active
    );
  }, [activeCategory]);

  const selectedItem = useMemo(() => {
    const selected = shopItems.find((item) => item.item_id === selectedItemId);

    if (selected && selected.item_type === activeCategory && selected.is_active) {
      return selected;
    }

    return visibleItems[0] ?? null;
  }, [activeCategory, selectedItemId, visibleItems]);

  function handleCategoryChange(categoryId) {
    const firstItem = shopItems.find(
      (item) => item.item_type === categoryId && item.is_active
    );

    setActiveCategory(categoryId);

    if (firstItem) {
      setSelectedItemId(firstItem.item_id);
    }
  }

  return (
    <main className="app-page shop-page">
      <header className="shop-header">
        <div className="will-balance">✧ 1,250 Will</div>

        <div className="shop-user">
          <div className="shop-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="shop-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="shop-window" aria-label="Egg shop">
        <header className="shop-window-header">
          <h1>▦ Egg Shop</h1>
          <a className="shop-info-button" href="/nest" aria-label="Return to egg">
            ⊙
          </a>
        </header>

        <div className="shop-content">
          <aside className="shop-category-panel" aria-label="Shop categories">
            {shopCategories.map((category) => (
              <button
                key={category.id}
                className={`shop-category-button ${
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

          <section className="shop-item-panel" aria-label="Shop items">
            <div className="shop-item-grid">
              {visibleItems.map((item) => (
                <button
                  key={item.item_id}
                  className={`shop-item-card ${
                    selectedItem?.item_id === item.item_id ? "selected" : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedItemId(item.item_id)}
                >
                  {item.equipped && <span className="equipped-badge">Equipped</span>}

                  <div className="shop-item-image">
                    {item.asset_url ? (
                      <img src={item.asset_url} alt="" />
                    ) : (
                      <span className="shop-image-placeholder" />
                    )}
                  </div>

                  <div className="shop-item-info">
                    <div>
                      <strong>{item.name}</strong>
                      {item.description && (
                        <p className="shop-item-description">{item.description}</p>
                      )}
                    </div>

                    {item.owned ? (
                      <span className="owned-label">Owned</span>
                    ) : (
                      <span className="price-label">{item.price} ✦</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="shop-footer">
          <a className="shop-close-button" href="/nest">
            Close
          </a>

          {selectedItem && !selectedItem.owned && (
            <button className="buy-item-button" type="button">
              Buy Item
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

export default ShopPage;