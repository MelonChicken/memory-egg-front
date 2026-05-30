import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* import { createPost } from "../api/postsApi"; */
import { usePosts } from "../hooks/usePosts";
import { checkPostAgainstQuests } from "../api/questsApi";
import "./WritePostPage.css";

function WritePostPage() {
  const { addPost } = usePosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("reflection");
  /*const [imageUrl, setImageUrl] = useState("");*/
  const [visibility, setVisibility] = useState("private");

  const navigate = useNavigate();

  {/*NOTE: LOGICS SHOULD BE IMPLEMENTED IN BACKEND. THESE ARE TEMPORARY PLACEHOLDERS */}
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedWill = Math.max(1, Math.floor(wordCount / 10));

  async function handleSubmit(event) {
    event.preventDefault(); /*Stop page from refreshing in form submit*/

    if (!title.trim() || !content.trim()) {
      alert("Please write both title and content.");
      return;
    }

    const newPost = await addPost({
      title,
      content,
      tag,
      image_url: null,
      visibility,
    });

    await checkPostAgainstQuests(newPost);

    alert("Post created! Redirecting you to Archive Page");
    navigate("/archive"); 
  }

  return (
    <main className={`app-page write-post-page visibility-${visibility}`}>
      <header className="write-header">
        <div className="write-brand">nacimiento</div>

        <nav className="write-nav" aria-label="Main navigation">
          <a href="/nest">⌂ Nest</a>
          <a href="/shop">▣ Shop</a>
        </nav>

        <div className="write-user">
          <div className="write-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="write-avatar" aria-label="User profile placeholder" />
        </div>
      </header>

      <section className="write-layout">
        <section className="write-main">
          <div className="write-page-heading">
            <h1>What's your today's story?</h1>
            <p>Take a moment to reflect and write.</p>
          </div>

          <form className="write-form" onSubmit={handleSubmit}>
            <section className="write-editor-card">
              <label className="write-title-label" htmlFor="post-title">
                <span className="sr-only">Post title</span>
                <input
                  id="post-title"
                  className="write-title-input"
                  type="text"
                  placeholder="A quiet morning..."
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>

              <label className="write-body-label" htmlFor="post-body">
                <span>Start typing here...</span>
                <textarea
                  id="post-body"
                  className="write-body-input"
                  placeholder="Start typing here..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </label>

              <button className="write-image-upload" type="button">
                <span className="upload-icon">▧</span>
                <strong>Attach an image</strong>
                <small>Drag and drop or enter URL</small>
              </button>
            </section>

            <label className="write-tag-field">
              <span>Memory Tag</span>

              <div className="write-tag-select-wrap">
                <select
                  className="write-tag-select"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                >
                  <option value="reflection">Reflection</option>
                  <option value="study">Study</option>
                  <option value="food">Food</option>
                  <option value="growth">Growth</option>
                </select>
              </div>
            </label>

            <div className="write-bottom-bar">
              <fieldset className="visibility-toggle">
                <legend className="sr-only">Post visibility</legend>

                <label>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === "private"}
                    onChange={() => setVisibility("private")}
                  />
                  <span>Private</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === "public"}
                    onChange={() => setVisibility("public")}
                  />
                  <span>Public</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="visibility"
                    value="anonymous"
                    checked={visibility === "anonymous"}
                    onChange={() => setVisibility("anonymous")}
                  />
                  <span>Anonymous</span>
                </label>
              </fieldset>

              <button className="post-submit-button" type="submit">
                Post
              </button>
            </div>
          </form>
        </section>

        <aside className="write-side-panel" aria-label="Memory statistics">
          <section className="memory-stats-card">
            <h2>Memory Stats</h2>

            <div className="memory-stat-row">
              <span>Word Count</span>
              <strong>↝ {wordCount}</strong>
            </div>

            <div className="memory-stat-row">
              <span>Estimated Will</span>
              <strong>↝ {estimatedWill}</strong>
            </div>
          </section>

          <p className="memory-note">
            Writing helps your egg<br />
            grow stronger.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default WritePostPage;