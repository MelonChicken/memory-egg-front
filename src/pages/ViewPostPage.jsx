import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../api/postsApi";
import "./ViewPostPage.css";

function ViewPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const foundPost = await getPostById(id);

      setPost(foundPost || null);
      setLoading(false);
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <main className="app-page view-post-page">
        <p>Loading memory...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="app-page view-post-page">
        <p>Post not found.</p>
        <a href="/archive">← Back to Archive</a>
      </main>
    );
  }

  async function handleDelete() {
    console.log("Delete button clicked");
    console.log("Current post:", post);

    const confirmed = window.confirm("Delete this memory?");

    console.log("Confirmed:", confirmed);

    if (!confirmed) {
      return;
    }

    await deletePost(post.post_id);

    console.log("Deleted post id:", post.post_id);

    navigate("/archive");
  }

  return (
    <main className="app-page view-post-page">
      <header className="view-header">
        <div className="view-brand">Nacimiento</div>

        <nav className="view-nav" aria-label="Main navigation">
          <a href="/nest">⌂ Nest</a>
          <a href="/shop">▣ Shop</a>
        </nav>

        <div className="view-user">
          <div className="view-user-text">
            <span>WANDERER</span>
            <strong>14 Days</strong>
          </div>
          <div className="view-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="view-post-layout">
        <a className="back-to-archive" href="/archive">
          ← Back to Archive
        </a>

        <article className="post-detail-card">
          <header className="post-detail-header">
            <h1>{post.title}</h1>

            <div className="post-meta-row">
              <span>▣ {new Date(post.created_at).toLocaleDateString()}</span>
              <span className="post-tag">{post.tag}</span>
              <span>◉ {post.visibility}</span>
              <span>⌁ {post.word_count} words</span>
              <span>✧ +{post.will_reward} Will</span>
            </div>
          </header>

          <section className="post-detail-body">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        </article>

        <div className="post-detail-actions">
          <button
            className="delete-post-button"
            type="button"
            onClick={handleDelete}
          >
            ⌫ Delete Post
          </button>
        </div>
      </section>
    </main>
  );
}

export default ViewPostPage;