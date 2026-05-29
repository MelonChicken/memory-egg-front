import { useState } from "react";
import "./MemoryArchivePage.css";

/* This is just example of archivePosts. Also tests if post list scroll works finely. */
const archivePosts = [
  {
    post_id: 1,
    user_id: 1,
    title: "Nov 2",
    content:
      "I'm studying Web Programming. This is so fun as I could create my imagination into something real.",
    image_url: null,
    tag: "study",
    visibility: "private",
    word_count: 128,
    will_reward: 12,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 2,
    user_id: 1,
    title: "The Storm of chips",
    content:
      "I love potato chips. A bottle of Coca-cola goes well with this ngl.",
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    tag: "food",
    visibility: "public",
    word_count: 286,
    will_reward: 18,
    created_at: "2025-11-08",
    updated_at: "2025-11-08",
  },
  {
    post_id: 3,
    user_id: 1,
    title: "The First Crack",
    content:
      "This morning, I found a tiny crack on the surface of the egg. Is it a sign that my will is starting to take shape? I feel a swell of emotion in my heart. It feels real now. The weight of existence is shifting into something new.",
    image_url: null,
    tag: "growth",
    visibility: "public",
    word_count: 342,
    will_reward: 50,
    created_at: "2025-11-24",
    updated_at: "2025-11-24",
  },
  {
    post_id: 4,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 5,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 6,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 7,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 8,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 9,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 10,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 11,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 12,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 13,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 14,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 15,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 16,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 17,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 18,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 19,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 20,
    user_id: 1,
    title: "Example",
    content:
      "Welcome to the Nacimiento. This is driedoutjerky who's working on the frontend. It's my first time using React and actually feels quite similar to the html. I need to make css anyway.",
    image_url: null,
    tag: "reflection",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: "2025-11-02",
    updated_at: "2025-11-02",
  },
  {
    post_id: 21,
    user_id: 1,
    title: "Unknown Memory",
    content:
      "A memory waiting to be found. The page is still blank, but something about it feels familiar.",
    image_url: null,
    tag: "mystery",
    visibility: "private",
    word_count: 0,
    will_reward: 0,
    created_at: null,
    updated_at: null,
  },
];

function formatPostDate(dateString) {
  if (!dateString) {
    return "Unknown";
  }

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
/* PREV VER.
function createPreviewText(content, maxLength = 150) {
  if (!content) {
    return "No preview available.";
  }

  if (content.length <= maxLength) {
    return content;
  }

  return content.slice(0, maxLength).trim() + "...";
}
*/ 
/*
function createPreviewText(content, maxLength = 150) {
  if (!content) {
    return "No preview available.";
  }

  if (content.length <= maxLength) {
    return content;
  }

  const shortened = content.slice(0, maxLength);
  const lastSpaceIndex = shortened.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return shortened + "...";
  }

  return shortened.slice(0, lastSpaceIndex).trim() + "...";
} */
function createPreviewText(content, maxLength = 150) {
  if (!content) {
    return "No preview available.";
  }

  if (content.length <= maxLength) {
    return content;
  }

  const shortened = content.slice(0, maxLength);
  const lastSpaceIndex = shortened.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return shortened + "...";
  }

  return shortened.slice(0, lastSpaceIndex).trim() + "...";
}

/* More universal
function getTagClassName(tag) {
  return `tag-${tag || "general"}`;
}
*/
/*But for now we just using two tags mainly. */
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



function MemoryArchivePage() {
  const [selectedPost, setSelectedPost] = useState(archivePosts[2]);

  return (
    <main className="app-page memory-archive-page">
      <header className="archive-header">
        <div className="archive-brand">Nacimiento</div>

        <nav className="archive-nav" aria-label="Main navigation">
          <a href="/nest">⌂ Nest</a>
          <a href="/shop">▣ Shop</a>
        </nav>

        <div className="archive-user">
          <div className="archive-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="archive-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="archive-layout">
        <aside className="archive-sidebar">
          <div className="archive-title-block">
            <h1>
              Memory
              <br />
              Cabinet
            </h1>
            <p>Eggcellent journeys</p>
          </div>

          <nav className="archive-shelf-nav" aria-label="Archive shelves">
            <a className="active" href="/archive">
              ▧ Main Shelf
            </a>
          </nav>

          <section className="archive-progress-card">
            <div className="archive-progress-icon">▥</div>
            <h2>Archive Progress</h2>
            <p>20 memories found</p>
          </section>
        </aside>

        <section className="archive-main-panel" aria-label="Archived posts">
          <div className="archive-post-grid">
            {archivePosts.map((post) => (
              <button
                key={post.post_id}
                className={`archive-post-card ${
                  selectedPost.post_id === post.post_id ? "selected" : ""
                }`}
                type="button"
                onClick={() => setSelectedPost(post)}
              >
                <div className="archive-post-image">
                  {post.image_url ? (
                    <img src={post.image_url} alt="" />
                  ) : (
                    <span>{post.title === "Unknown Memory" ? "?" : "✉"}</span>
                  )}
                </div>

                <strong>{post.title}</strong>
                <span className={`archive-card-tag ${getTagClassName(post.tag)}`}>
                  {post.tag}
                </span>
              </button>
            ))}
          </div>
        </section>

        <aside className="archive-preview-panel" aria-label="Selected post preview">

          <span className="preview-label">Selected Object</span>

          <h2>{selectedPost.title}</h2>

          <div className="preview-tags">
            <span className={getTagClassName(selectedPost.tag)}>
              {selectedPost.tag}
            </span>
            <span className="tag-will">will +{selectedPost.will_reward}</span>
          </div>

          <p className="preview-excerpt">
            “{createPreviewText(selectedPost.content, 170)}”
          </p>

          <div className="preview-divider" />

          <div className="preview-meta">
            <span>Recovered {formatPostDate(selectedPost.created_at)}</span>
            <span>◉ {selectedPost.visibility}</span>
          </div>

          <div className="preview-actions">
            <a href={`/archive/${selectedPost.post_id}`}>⌕ View</a>
            <button type="button" aria-label="Delete post">
              ⌫
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default MemoryArchivePage;