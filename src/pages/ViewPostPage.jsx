import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import "./ViewPostPage.css";

function ViewPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getPost, removePost } = usePosts();

  useEffect(() => {
    let ignore = false;

    async function loadPost() {
      setLoading(true);

      try {
        const foundPost = await getPost(id);

        if (!ignore) {
          setPost(foundPost || null);
        }
      } catch (error) {
        console.warn("Failed to load post:", error);

        if (!ignore) {
          setPost(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      ignore = true;
    };
  }, [id, getPost]);

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

  async function handleDeletePost() {
    if (!post) {
      return;
    }

    const confirmed = window.confirm("Delete this post?");

    if (!confirmed) {
      return;
    }

    try {
      await removePost(post.post_id || post.id);
      navigate("/archive", { replace: true });
    } catch (error) {
      console.warn("Failed to delete post:", error);
    }
  }

  return (
    <main className="app-page view-post-page">

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
            onClick={handleDeletePost}
          >
            ⌫ Delete Post
          </button>
        </div>
      </section>
    </main>
  );
}

export default ViewPostPage;