import "./EggDashboardPage.css";

function EggDashboardPage() {
  return (
    <main className="app-page egg-dashboard-page">
      <header className="dashboard-header">
        <h1>Nacimiento - My Egg</h1>

        <div className="dashboard-user">
          <div className="dashboard-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="dashboard-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="dashboard-content">
        <section className="window-area" aria-label="Egg window scene placeholder">
          <div className="window-frame">
            <div className="window-view">
              <div className="scene-placeholder scene-egg">Egg image</div>
              <div className="scene-placeholder scene-nest">Nest image</div>
              <div className="window-sill" />
            </div>
          </div>
        </section>

        <aside className="dashboard-notebook">
          <div className="bookmark bookmark-green" />
          <div className="bookmark bookmark-red" />

          <h2>My Notebook</h2>

          <section className="quest-paper">
            <div className="paper-clip" />

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
        </aside>
      </section>
    </main>
  );
}

export default EggDashboardPage;