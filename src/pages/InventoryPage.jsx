import { useMemo, useState } from "react";
import { useInventory } from "../hooks/useInventory";
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

function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("background");
  const [selectedUserItemId, setSelectedUserItemId] = useState(null);

  const {
    inventoryItems,
    loading,
    errorMessage,
    equipItem,
    unequipItem,
  } = useInventory();

  const visibleItems = useMemo(() => {
    return inventoryItems.filter(
      (item) => item.item_type === activeCategory && item.is_active
    );
  }, [activeCategory, inventoryItems]);

  const selectedItem = useMemo(() => {
    const selected = inventoryItems.find(
      (item) => Number(item.user_item_id) === Number(selectedUserItemId)
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
    setSelectedUserItemId(firstItem?.user_item_id ?? null);
  }

  async function handleToggleEquip() {
    if (!selectedItem) {
      return;
    }

    try {
      const updatedInventoryItems = selectedItem.is_equipped
        ? await unequipItem(selectedItem.user_item_id)
        : await equipItem(selectedItem.user_item_id);

      const stillSelectedItem = updatedInventoryItems.find(
        (item) => Number(item.user_item_id) === Number(selectedItem.user_item_id)
      );

      setSelectedUserItemId(stillSelectedItem?.user_item_id ?? null);
    } catch {
      // errorMessage is handled inside useInventory
    }
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
              {loading ? (
                <p className="inventory-empty-message">Loading inventory...</p>
              ) : visibleItems.length === 0 ? (
                <p className="inventory-empty-message">
                  No items owned in this category yet.
                </p>
              ) : (
                visibleItems.map((item) => (
                  <button
                    className={`inventory-item-card ${
                      Number(selectedItem?.user_item_id) === Number(item.user_item_id)
                        ? "selected"
                        : ""
                    }`}
                    key={item.user_item_id}
                    type="button"
                    onClick={() => setSelectedUserItemId(item.user_item_id)}
                  >
                    <div className="inventory-item-image">
                      {item.asset_url ? (
                        <img src={item.asset_url} alt={item.name} />
                      ) : (
                        <span>▧</span>
                      )}
                    </div>

                    {item.is_equipped && <span className="equipped-badge">Equipped</span>}

                    <div className="inventory-item-info">
                      <div>
                        <strong>{item.name}</strong>
                        <p className="inventory-item-description">{item.description}</p>
                      </div>

                      {item.effect_type && item.effect_value && (
                        <span className="effect-label">
                          +{item.effect_value} {item.effect_type}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>

        <footer className="inventory-footer">
          <a className="inventory-close-button" href="/nest">
            Close
          </a>

          {selectedItem ? (
            <button
              className="equip-item-button"
              type="button"
              onClick={handleToggleEquip}
            >
              {selectedItem.is_equipped ? "Unequip" : "Equip"}
            </button>
          ) : (
            <button className="equip-item-button" type="button" disabled>
              No Item Selected
            </button>
          )}

          {errorMessage && <p className="inventory-error-message">{errorMessage}</p>}
        </footer>
      </section>
    </main>
  );
}

export default InventoryPage;