import "./ProfilePage.css";

function ProfilePage() {
  return (
    <main className="app-page profile-page">
      <header className="profile-header">
        <div className="profile-brand">Nacimiento</div>

        <nav className="profile-nav" aria-label="Main navigation">
          <a href="/nest">⌂ Nest</a>
          <a href="/shop">▣ Shop</a>
        </nav>

        <div className="profile-user">
          <div className="profile-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="profile-avatar-small" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="profile-layout">
        <section className="profile-card profile-hero-card">
          <div className="profile-avatar-large">
            <div className="profile-face" />
            <span className="profile-level">Lv. 5</span>
          </div>

          <div className="profile-identity">
            <h1>Wanderer</h1>
            <p>Cultivating thoughts since October.</p>

            <div className="profile-badges">
              <article className="profile-badge">
                <span>Streak</span>
                <strong>↝ 14 days</strong>
              </article>

              <article className="profile-badge">
                <span>Will Balance</span>
                <strong>∞ 350 will</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="profile-grid">
          <section className="profile-left-column">
            <article className="profile-card profile-total-words">
              <div>
                <span className="profile-section-label">↝ Total Words Penned</span>
                <strong>12,408</strong>
              </div>

              <div className="profile-card-icon" aria-hidden="true">
                ◴
              </div>
            </article>

            <div className="profile-mini-grid">
              <article className="profile-card profile-mini-card">
                <span className="profile-section-label">Posts Written</span>
                <strong>27</strong>
                <span className="profile-check">◎</span>
              </article>

              <article className="profile-card profile-mini-card">
                <span className="profile-section-label">Quests Completed</span>
                <strong>27</strong>
                <span className="profile-check">◎</span>
              </article>
            </div>

            <article className="profile-card profile-tags-card">
              <span className="profile-section-label">Most Used Tags</span>

              <div className="profile-tags">
                <span>#food</span>
                <span>#study</span>
              </div>
            </article>
          </section>

          <aside className="profile-card egg-resonance-card">
            <h2>▧ Egg Resonance</h2>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Glow</span>
                <small>2.00</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: "72%" }} />
              </div>
              <p>Clarity of thought is increasing.</p>
            </div>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Warmth</span>
                <small>1.29</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: "45%" }} />
              </div>
              <p>Emotional processing requires attention.</p>
            </div>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Weight</span>
                <small>2.32</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: "85%" }} />
              </div>
              <p>A heavy accumulation of experiences.</p>
            </div>

            <p className="resonance-quote">
              “The shell thickens with every word written.”
            </p>
          </aside>
        </section>

        <div className="profile-return-row">
          <a className="profile-return-button" href="/nest">
            ← Return to Egg
          </a>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;