import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !nickname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      await registerUser({
        nickname,
        email,
        password,
      });

      navigate("/nest");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="app-page register-page">
      <section className="register-intro" aria-labelledby="register-intro-title">
        <h2 id="register-intro-title">A digital sanctuary for your story</h2>
        <p>
          Care for your digital egg by providing it with the warmth of your daily
          memories. Watch as it matures alongside your reflection.
        </p>
      </section>

      <section className="register-card" aria-labelledby="register-title">
        <h1 id="register-title" className="register-title">
          Nacimiento
        </h1>

        <p className="register-subtitle">
          “Write your memories. Care for your egg. Your forgotten self is waiting.”
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-field">
            <span>Nickname</span>
            <input
              type="text"
              name="nickname"
              placeholder="What should we call you?"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </label>

          <label className="register-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email for login"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="register-field">
            <span>Secret Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="register-field">
            <span>Verify Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Type the same password as above."
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>

          {errorMessage && (
            <p className="register-error-message">{errorMessage}</p>
          )}

          <button
            className="register-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="register-login-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;