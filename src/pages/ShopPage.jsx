import { useMemo, useState } from "react";
import { useShop } from "../hooks/useShop";
import "./ShopPage.css";
import {
  getBackgroundAsset,
  getCosmeticAsset,
} from "../assets/assetRegistry";

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

function getShopItemImage(item) {
  if (!item?.asset_key) {
    return item?.asset_url || null;
  }

  if (item.item_type === "background") {
    return getBackgroundAsset(item.asset_key);
  }

  if (item.item_type === "decoration") {
    return getCosmeticAsset(item.asset_key);
  }

  return item.asset_url || null;
}

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("background");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const {
    shopItems,
    user,
    loading,
    errorMessage,
    purchaseItem,
  } = useShop();

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

  const userWillBalance = Number(user?.will_balance || 0);

  const cannotAffordSelectedItem =
    selectedItem && userWillBalance < Number(selectedItem.price);

  const shouldShowNotEnoughWill =
    selectedItem && !selectedItem.owned && cannotAffordSelectedItem;

  const isBuyButtonDisabled =
    !user ||
    !selectedItem ||
    selectedItem.owned ||
    cannotAffordSelectedItem;

  function handleCategoryChange(categoryId) {
    const firstItem = shopItems.find(
      (item) => item.item_type === categoryId && item.is_active
    );

    setActiveCategory(categoryId);
    setSelectedItemId(firstItem?.item_id ?? null);
  }

  async function handlePurchaseSelectedItem() {
    if (!selectedItem || selectedItem.owned || cannotAffordSelectedItem) {
      return;
    }

    try {
      await purchaseItem(selectedItem.item_id);
      setSelectedItemId(selectedItem.item_id);
    } catch {
      // errorMessage is handled inside useShop
    }
  }

  return (
    <main className="app-page shop-page">

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
                    <div className={`shop-item-image shop-item-image-${item.item_type}`}>
                      {getShopItemImage(item) ? (
                        <img src={getShopItemImage(item)} alt={item.name} />
                      ) : (
                        <span>{item.item_type === "music" ? "♪" : "▧"}</span>
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
            {errorMessage && (
              <p className="shop-error-message">{errorMessage}</p>
            )}

            {!errorMessage && shouldShowNotEnoughWill && (
              <p className="shop-error-message">Not enough Will.</p>
            )}

            <button
              className="buy-item-button"
              type="button"
              onClick={handlePurchaseSelectedItem}
              disabled={isBuyButtonDisabled}
            >
              {selectedItem?.owned ? "Owned" : "Buy Item"}
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default ShopPage;