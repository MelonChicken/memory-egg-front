import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useQuests } from "../hooks/useQuests";
import { doesPostLikelySatisfyQuest } from "../utils/questMatching";
import "./WritePostPage.css";

function WritePostPage() {
  const { addPost } = usePosts();
  const { user, reloadUser } = useCurrentUser();
  const { quests, claimQuestForPost } = useQuests(); 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("reflection");
  /*const [imageUrl, setImageUrl] = useState("");*/
  const [visibility, setVisibility] = useState("private");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  {/*NOTE: LOGICS SHOULD BE IMPLEMENTED IN BACKEND. THESE ARE TEMPORARY PLACEHOLDERS */}
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedWill = Math.max(1, Math.floor(wordCount / 10));

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Please write both title and content.");
      return;
    }

    setSubmitting(true);

    try {
      const { newPost } = await addPost({
        title,
        content,
        tag,
        image_url: null,
        visibility,
      });

      const createdPost = newPost.post || newPost;
      const postId = createdPost.id || createdPost.post_id;

      const matchingQuests = quests.filter((quest) =>
        doesPostLikelySatisfyQuest(createdPost, quest)
      );

      let claimedQuestCount = 0;

      for (const quest of matchingQuests) {
        try {
          await claimQuestForPost({
            userQuestId: quest.user_quest_id,
            postId,
          });

          claimedQuestCount += 1;
        } catch (claimError) {
          console.warn("Quest claim failed:", claimError);
        }
      }

      await reloadUser();

      if (claimedQuestCount > 0) {
        setSuccessMessage(
          `Post created. ${claimedQuestCount} quest reward claimed! Redirecting...`
        );
      } else {
        setSuccessMessage("Post created. Redirecting...");
      }

      setTimeout(() => {
        navigate("/archive");
      }, 700);
      } catch (error) {
        setErrorMessage(error.message || "Failed to create post.");
        setSubmitting(false);
      }
  }

  return (
    <main className={`app-page write-post-page visibility-${visibility}`}>
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

              <div className="write-submit-area">
                {errorMessage && (
                  <p className="write-post-message write-post-message-error">
                    {errorMessage}
                  </p>
                )}

                {successMessage && (
                  <p className="write-post-message write-post-message-success">
                    {successMessage}
                  </p>
                )}

                <button
                  className="post-submit-button"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Post"}
                </button>
              </div>
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

            <div className="memory-stat-row">
              <span>Current Will</span>
              <strong>↝ {user ? user.will_balance : 0}</strong>
            </div>
          </section>

          <section className="write-quest-card">
            <h2>Today’s Quests</h2>

            {quests.length === 0 ? (
              <p className="write-quest-empty">No quests assigned.</p>
            ) : (
              <div className="write-quest-list">
                {quests.map((quest) => (
                  <article className="write-quest-item" key={quest.quest_id}>
                    <div>
                      <strong>{quest.title}</strong>
                      <p>{quest.description}</p>
                      <span className={`quest-status quest-status-${quest.status}`}>
                        {quest.status}
                      </span>
                    </div>
                    {/* REMOVED: quest completion is automated. 
                    {quest.status === "completed" && (
                      <button
                        type="button"
                        onClick={() => handleClaimQuest(quest.quest_id)}
                      >
                        Claim +{quest.reward_will}
                      </button>
                    )}
                    */}
                    {quest.status === "claimed" && <small>Reward claimed</small>}
                  </article>
                ))}
              </div>
            )}
          </section>

          <p className="memory-note">
            Writing helps your egg
            <br />
            grow stronger.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default WritePostPage;