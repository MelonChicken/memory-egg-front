import { useEffect, useMemo, useState } from "react";
import { getShopItems, purchaseShopItem } from "../api/shopApi";
import { getCurrentUser } from "../api/userApi";
import "./ShopPage.css";

const shopCategories = [
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

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("background");
  const [shopItems, setShopItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    async function loadShopPageData() {
      setLoading(true);

      const [items, currentUser] = await Promise.all([
        getShopItems(),
        getCurrentUser(),
      ]);

      setShopItems(Array.isArray(items) ? items : []);
      setUser(currentUser);

      const firstVisibleItem = items.find(
        (item) => item.item_type === activeCategory && item.is_active
      );

      setSelectedItemId(firstVisibleItem?.item_id ?? null);
      setLoading(false);
    }

    loadShopPageData();
  }, [activeCategory]);

  const visibleItems = useMemo(() => {
    return shopItems.filter(
      (item) => item.item_type === activeCategory && item.is_active
    );
  }, [activeCategory, shopItems]);

  const selectedItem = useMemo(() => {
    const selected = shopItems.find(
      (item) => Number(item.item_id) === Number(selectedItemId)
    );

    if (selected && selected.item_type === activeCategory && selected.is_active) {
      return selected;
    }

    return visibleItems[0] ?? null;
  }, [activeCategory, selectedItemId, shopItems, visibleItems]);

  function handleCategoryChange(categoryId) {
    const firstItem = shopItems.find(
      (item) => item.item_type === categoryId && item.is_active
    );

    setActiveCategory(categoryId);
    setSelectedItemId(firstItem?.item_id ?? null);
  }

  async function handlePurchaseSelectedItem() {
  if (!selectedItem) {
    return;
  }

  setErrorMessage("");

  try {
    const result = await purchaseShopItem(selectedItem.item_id);

    setShopItems(result.shopItems);
    setUser(result.user);
    setSelectedItemId(selectedItem.item_id);
  } catch (error) {
    setErrorMessage(error.message);
  }
}

  return (
    <main className="app-page shop-page">
      <header className="shop-header">
        <div className="will-balance">✧ {user ? user.will_balance : 0} Will</div>

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
          <a className="shop-return-link" href="/nest" aria-label="Return to egg">
            Return To Egg
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
              {loading ? (
                <p className="shop-error-message">Loading shop...</p>
              ) : visibleItems.length === 0 ? (
                <p className="shop-error-message">No items available.</p>
              ) : (
                visibleItems.map((item) => (
                  <button
                    className={`shop-item-card ${
                      Number(selectedItem?.item_id) === Number(item.item_id) ? "selected" : ""
                    }`}
                    key={item.item_id}
                    type="button"
                    onClick={() => setSelectedItemId(item.item_id)}
                  >
                    <div className="shop-item-image">
                      {item.asset_url ? (
                        <img src={item.asset_url} alt={item.name} />
                      ) : (
                        <span>▧</span>
                      )}
                    </div>

                    {item.equipped && <span className="equipped-badge">Equipped</span>}

                    <div className="shop-item-info">
                      <div>
                        <strong>{item.name}</strong>
                        <p className="shop-item-description">{item.description}</p>
                      </div>

                      {item.owned ? (
                        <span className="owned-label">Owned</span>
                      ) : (
                        <span className="price-label">{item.price} Will</span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>

        <footer className="shop-footer">
          <a className="shop-close-button" href="/nest">
            Close
          </a>

          <div className="shop-footer-actions">
            {(errorMessage ||
              (selectedItem && user && user.will_balance < selectedItem.price)) && (
              <p className="shop-error-message">
                {errorMessage || "Not enough Will."}
              </p>
            )}

            {selectedItem && !selectedItem.owned && (
              <button
                className="buy-item-button"
                type="button"
                onClick={handlePurchaseSelectedItem}
                disabled={!user || user.will_balance < selectedItem.price}
              >
                Buy Item
              </button>
            )}

            {selectedItem?.owned && (
              <button className="buy-item-button" type="button" disabled>
                Owned
              </button>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}

export default ShopPage;