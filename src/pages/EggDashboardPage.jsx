import "./EggDashboardPage.css";

import eggImage from "../assets/egg.PNG";
import nestImage from "../assets/nest.PNG";
import notebookImage from "../assets/notebook.PNG";
import windowFrameImage from "../assets/windowframe.PNG";
import windowBackgroundImage from "../assets/background.png";

import { useEgg } from "../hooks/useEgg";

function EggDashboardPage() {
  const { egg, loading } = useEgg();
  return (
    <main className="app-page egg-dashboard-page">
      <section className="dashboard-content">
        <section className="window-area" aria-label="Egg window scene placeholder">
          <div
            className="window-frame"
            style={{ "--window-frame-image": `url(${windowFrameImage})` }}
          >
            <div
              className="window-view"
              style={{ "--window-background-image": `url(${windowBackgroundImage})` }}
            >
              <div className="window-sill" />
            </div>

            <div className="scene-layer">
              <div className="scene-group">
                <div className="scene-art scene-nest">
                  <img src={nestImage} alt="Nest" />
                </div>

                <div className="scene-art scene-egg">
                  <img src={eggImage} alt="Egg" />
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
              style={{ "--notebook-image": `url(${notebookImage})` }}
            >
              <h2 className="notebook-title">My Notebook</h2>

              <section className="notebook-paper-content" aria-label="Today’s quests">
                <h3>Today’s Quests</h3>

                <ul>
                  <li>
                    <input type="checkbox" readOnly />
                    <span>Write 500+ words in total today</span>
                  </li>
                  <li>
                    <input type="checkbox" readOnly />
                    <span>Write about what you studied</span>
                  </li>
                  <li>
                    <input type="checkbox" readOnly />
                    <span>Upload one photo memory</span>
                  </li>
                </ul>
              </section>

              <nav className="dashboard-actions" aria-label="Dashboard actions">
                <a href="/write">Write Post</a>
                <a href="/shop">Shop</a>
                <a href="/archive">Archive</a>
                <a href="/inventory">Inventory</a>
              </nav>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default EggDashboardPage;