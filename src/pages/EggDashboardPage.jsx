import "./EggDashboardPage.css";

import { useEgg } from "../hooks/useEgg";
import { useQuests } from "../hooks/useQuests";
import {
  baseAssets,
  getBackgroundAsset,
  getCosmeticAsset,
} from "../assets/assetRegistry";
import { Link } from "react-router-dom";

function EggDashboardPage() {
  const { egg, loading } = useEgg();
  const { quests, loading: questsLoading } = useQuests();

  const equippedCosmeticKey = egg?.equipped_cosmetic || egg?.equippedCosmetic || null;
  const equippedCosmeticImage = equippedCosmeticKey
    ? getCosmeticAsset(equippedCosmeticKey)
    : null;
  const equippedBackgroundKey = egg?.equipped_background || egg?.equippedBackground || "default";
  const equippedBackgroundImage = getBackgroundAsset(equippedBackgroundKey);

  return (
    <main className="app-page egg-dashboard-page">
      <section className="dashboard-content">
        <section className="window-area" aria-label="Egg window scene placeholder">
          <div
            className="window-frame"
            style={{ "--window-frame-image": `url(${baseAssets.windowFrame})` }}
          >
            <div
              className="window-view"
              style={{ "--window-background-image": `url(${equippedBackgroundImage})` }}
            >
              <div className="window-sill" />
            </div>

            <div className="scene-layer">
              <div className="scene-group">
                <div className="scene-art scene-nest">
                  <img src={baseAssets.nest} alt="Nest" />
                </div>

                <div className="scene-art scene-egg">
                  <img src={baseAssets.egg} alt="Egg" />

                  {equippedCosmeticImage && (
                    <img
                      src={equippedCosmeticImage}
                      alt=""
                      aria-hidden="true"
                      className="scene-cosmetic"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="dashboard-side-panel">
          <section className="egg-stats-card" aria-label="Egg statistics">
            <div className="egg-stats-header">
              <span>Egg Status</span>
              <strong>{loading || !egg ? "Loading..." : `Stage ${egg.stage}`}</strong>
            </div>

            {loading || !egg ? (
              <p className="egg-stats-loading">Loading egg stats...</p>
            ) : (
              <div className="egg-stat-list">
                <div className="egg-stat-row">
                  <div className="egg-stat-label">
                    <span>Glow</span>
                    <strong>{egg.glow}</strong>
                  </div>
                  <div className="egg-stat-bar" aria-label={`Glow ${egg.glow}`}>
                    <span style={{ width: `${egg.glow}%` }} />
                  </div>
                </div>

                <div className="egg-stat-row">
                  <div className="egg-stat-label">
                    <span>Warmth</span>
                    <strong>{egg.warmth}</strong>
                  </div>
                  <div className="egg-stat-bar" aria-label={`Warmth ${egg.warmth}`}>
                    <span style={{ width: `${egg.warmth}%` }} />
                  </div>
                </div>

                <div className="egg-stat-row">
                  <div className="egg-stat-label">
                    <span>Weight</span>
                    <strong>{egg.weight}</strong>
                  </div>
                  <div className="egg-stat-bar" aria-label={`Weight ${egg.weight}`}>
                    <span style={{ width: `${egg.weight}%` }} />
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="dashboard-notebook">
            <div
              className="notebook-shell"
              style={{ "--notebook-image": `url(${baseAssets.notebook})` }}
            >
              <h2 className="notebook-title">My Notebook</h2>

              <section className="notebook-paper-content" aria-label="Today’s quests">
                <h3>Today’s Quests</h3>

              {questsLoading ? (
                <p>Loading quests...</p>
              ) : quests.length === 0 ? (
                <p>No quests assigned.</p>
              ) : (
                <ul>
                  {quests.map((quest) => (
                    <li key={quest.quest_id}>
                      <input
                        type="checkbox"
                        readOnly
                        checked={quest.status === "completed" || quest.status === "claimed"}
                      />
                      <span>{quest.title}</span>
                    </li>
                  ))}
                </ul>
              )}
              </section>

              <nav className="dashboard-actions" aria-label="Dashboard actions">
                <Link to="/write">Write Post</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/archive">Archive</Link>
                <Link to="/inventory">Inventory</Link>
              </nav>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default EggDashboardPage;