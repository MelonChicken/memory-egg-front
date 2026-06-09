import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      await loginUser({
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
    <main className="app-page login-page">
      <section className="login-intro" aria-labelledby="login-intro-title">
        <h2 id="login-intro-title">A digital sanctuary for your story</h2>
        <p>
          Care for your digital egg by providing it with the warmth of your daily
          memories. Watch as it matures alongside your reflection.
        </p>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">
          Nacimiento
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Type in your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="login-field">
            <span>Secret Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <p className="login-subtitle">
            “Write your memories. Care for your egg. Your forgotten self is
            waiting.”
          </p>

          {errorMessage && (
            <p className="login-error-message">{errorMessage}</p>
          )}

          <button className="login-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="login-register-text">
          No account? <a href="/register">Sign up</a>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;