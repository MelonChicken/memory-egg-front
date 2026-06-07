import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import "./MemoryArchivePage.css";


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
  const { posts: archivePosts, loading, removePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);

  const selectedPost =
    archivePosts.find(
      (post) => Number(post.post_id) === Number(selectedPostId)
    ) ||
    archivePosts[0] ||
    null;

  async function handleDeleteSelectedPost() {
    const confirmed = window.confirm("Delete this memory?");

    if (!confirmed || !selectedPost) {
      return;
    }

    await removePost(selectedPost.post_id);
    setSelectedPostId(null);
  }

  if (loading) {
    return (
      <main className="app-page memory-archive-page">
        <p>Loading memories...</p>
      </main>
    );
  }

  if (archivePosts.length === 0 || !selectedPost) {
    return (
      <main className="app-page memory-archive-page">
        <header className="archive-header">
          <div className="archive-brand">Nacimiento</div>
        </header>

        <section className="archive-empty-state">
          <h1>No memories yet</h1>
          <p>Write your first notebook post to fill the archive.</p>
          <a href="/write">Write a post</a>
        </section>
      </main>
    );
  }

  return (
    <main className="app-page memory-archive-page">
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

            <a className="archive-write-link" href="/write">
              ✎ Write Post
            </a>
          </nav>

          <section className="archive-progress-card">
            <div className="archive-progress-icon">▥</div>
            <h2>Archive Progress</h2>
            <p>{archivePosts.length} memories found</p>
          </section>
        </aside>

        <section className="archive-main-panel" aria-label="Archived posts">
          <div className="archive-post-grid">
            {archivePosts.map((post) => (
              <button
                key={post.post_id}
                className={`archive-post-card ${
                  Number(selectedPost?.post_id) === Number(post.post_id) ? "selected" : ""
                }`}
                type="button"
                onClick={() => setSelectedPostId(post.post_id)}
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
            <a href={`/posts/${selectedPost.post_id}`}>⌕ View</a>
            <button
              type="button"
              aria-label="Delete post"
              onClick={handleDeleteSelectedPost}
            >
              ⌫
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default MemoryArchivePage;