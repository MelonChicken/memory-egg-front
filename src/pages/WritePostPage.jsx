import { useState } from "react";
import "./WritePostPage.css";

function WritePostPage() {
  const [visibility, setVisibility] = useState("private");
  return (
    <main className={`app-page write-post-page visibility-${visibility}`}>
      <section className="write-layout">
        <section className="write-main">
          <div className="write-page-heading">
            <h1>What's your today's story?</h1>
            <p>Take a moment to reflect and write.</p>
          </div>

          <form className="write-form">
            <section className="write-editor-card">
              <label className="write-title-label" htmlFor="post-title">
                <span className="sr-only">Post title</span>
                <input
                  id="post-title"
                  className="write-title-input"
                  type="text"
                  placeholder="A quiet morning..."
                />
              </label>

              <label className="write-body-label" htmlFor="post-body">
                <span>Start typing here...</span>
                <textarea
                  id="post-body"
                  className="write-body-input"
                  placeholder="Start typing here..."
                />
              </label>

              <button className="write-image-upload" type="button">
                <span className="upload-icon">▧</span>
                <strong>Attach an image</strong>
                <small>Drag and drop or enter URL</small>
              </button>
            </section>

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

              <button className="post-submit-button" type="button">
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
              <strong>↝ 0</strong>
            </div>

            <div className="memory-stat-row">
              <span>Estimated Will</span>
              <strong>↝ 0</strong>
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