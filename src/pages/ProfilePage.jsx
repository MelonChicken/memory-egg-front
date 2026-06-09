import "./ProfilePage.css";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEgg } from "../hooks/useEgg";
import { usePosts } from "../hooks/usePosts";
import { useQuests } from "../hooks/useQuests";

import { Link } from "react-router-dom";

function getTagClassName(tag) {
  const normalizedTag = tag?.toLowerCase();

  if (normalizedTag === "study") {
    return "tag-study";
  }

  if (normalizedTag === "food") {
    return "tag-food";
  }

  return "tag-general";
}

function getDaysSince(dateString) {
  if (!dateString) {
    return 0;
  }

  const createdDate = new Date(dateString);
  const today = new Date();

  const differenceMs = today - createdDate;
  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return Math.max(0, differenceDays);
}

function getTotalWords(posts) {
  return posts.reduce((sum, post) => {
    return sum + Number(post.word_count || 0);
  }, 0);
}

function getCompletedQuestCount(quests) {
  return quests.filter((quest) => {
    return quest.status === "completed" || quest.status === "claimed";
  }).length;
}

function getMostUsedTags(posts) {
  const tagCounts = {};

  posts.forEach((post) => {
    if (!post.tag) {
      return;
    }

    tagCounts[post.tag] = (tagCounts[post.tag] || 0) + 1;
  });

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);
}

function getStatPercent(value) {
  const numericValue = Number(value || 0);

  return `${Math.min(100, Math.max(0, numericValue))}%`;
}

function ProfilePage() {
  const { user, loading: userLoading } = useCurrentUser();
  const { egg, loading: eggLoading } = useEgg();
  const { posts, loading: postsLoading } = usePosts();
  const { quests, loading: questsLoading } = useQuests();

  const isLoading = userLoading || eggLoading || postsLoading || questsLoading;

  if (isLoading) {
    return (
      <main className="app-page profile-page">
        <section className="profile-layout">
          <section className="profile-card">
            <h1>Loading profile...</h1>
          </section>
        </section>
      </main>
    );
  }

  const nickname = user?.nickname || "Wanderer";
  const daysSinceJoin = getDaysSince(user?.created_at);
  const willBalance = Number(user?.will_balance || 0);

  const totalWords = getTotalWords(posts);
  const completedQuestCount = getCompletedQuestCount(quests);
  const mostUsedTags = getMostUsedTags(posts);

  const glow = Number(egg?.glow || 0);
  const warmth = Number(egg?.warmth || 0);
  const weight = Number(egg?.weight || 0);

  return (
    <main className="app-page profile-page">

      <section className="profile-layout">
        <section className="profile-card profile-hero-card">
          <div className="profile-avatar-large">
            <div className="profile-face" />
            <span className="profile-level">Lv. {egg?.stage || 1}</span>
          </div>

          <div className="profile-identity">
            <h1>{nickname}</h1>
            <p>Cultivating thoughts through memories and care.</p>

            <ul className="profile-badges" aria-label="Profile summary badges">
              <li className="profile-badge">
                <span>Days Since Join</span>
                <strong>↝ {daysSinceJoin} days</strong>
              </li>

              <li className="profile-badge">
                <span>Will Balance</span>
                <strong>∞ {willBalance} will</strong>
              </li>
            </ul>
          </div>
        </section>

        <section className="profile-grid">
          <section className="profile-left-column">
            <article className="profile-card profile-total-words">
              <div>
                <span className="profile-section-label">↝ Total Words Penned</span>
                <strong>{totalWords.toLocaleString()}</strong>
              </div>

              <div className="profile-card-icon" aria-hidden="true">
                ◴
              </div>
            </article>

            <div className="profile-mini-grid">
              <article className="profile-card profile-mini-card">
                <span className="profile-section-label">Posts Written</span>
                <strong>{posts.length}</strong>
                <span className="profile-check">◎</span>
              </article>

              <article className="profile-card profile-mini-card">
                <span className="profile-section-label">Quests Completed</span>
                <strong>{completedQuestCount}</strong>
                <span className="profile-check">◎</span>
              </article>
            </div>

            <article className="profile-card profile-tags-card">
              <span className="profile-section-label">Most Used Tags</span>

              {mostUsedTags.length === 0 ? (
                <p>No tags yet.</p>
              ) : (
                <ul className="profile-tags" aria-label="Most used tags">
                  {mostUsedTags.map((tag) => (
                    <li key={tag} className={getTagClassName(tag)}>
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>

          <aside className="profile-card egg-resonance-card">
            <h2>▧ Egg Resonance</h2>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Glow</span>
                <small>{glow}</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: getStatPercent(glow) }} />
              </div>
              <p>Clarity of thought is increasing.</p>
            </div>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Warmth</span>
                <small>{warmth}</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: getStatPercent(warmth) }} />
              </div>
              <p>Emotional processing requires attention.</p>
            </div>

            <div className="resonance-stat">
              <div className="resonance-row">
                <span>Weight</span>
                <small>{weight}</small>
              </div>
              <div className="resonance-bar">
                <span style={{ width: getStatPercent(weight) }} />
              </div>
              <p>A heavy accumulation of experiences.</p>
            </div>

            <p className="resonance-quote">
              “The shell thickens with every word written.”
            </p>
          </aside>
        </section>

        <div className="profile-return-row">
          <Link className="profile-return-button" to="/nest">
            ← Return to Egg
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;