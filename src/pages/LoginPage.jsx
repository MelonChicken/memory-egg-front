import "./LoginPage.css";

function LoginPage() {
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

        <form className="login-form">
          <label className="login-field">
            <span>ID</span>
            <input type="text" name="userId" placeholder="Type in your ID" />
          </label>

          <label className="login-field">
            <span>Secret Password</span>
            <input type="password" name="password" placeholder="••••••••" />
          </label>

          <p className="login-subtitle">
            “Write your memories. Care for your egg. Your forgotten self is
            waiting.”
          </p>

          <button className="login-submit" type="button">
            Sign In
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