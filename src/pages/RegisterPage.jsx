import "./RegisterPage.css";

function RegisterPage() {
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

        <form className="register-form">
          <label className="register-field">
            <span>Nickname</span>
            <input type="text" name="nickname" placeholder="What should we call you?" />
          </label>

          <label className="register-field">
            <span>ID</span>
            <input type="text" name="userId" placeholder="ID for login" />
          </label>

          <label className="register-field">
            <span>Secret Password</span>
            <input type="password" name="password" placeholder="••••••••" />
          </label>

          <label className="register-field">
            <span>Verify Password</span>
            <input type="password" name="confirmPassword" placeholder="Type the same password as above." />
          </label>

          <button className="register-submit" type="button"> {/* TODO: JS SUBMIT LOGIC NEED TO BE IMPLEMENTED */}
            Sign Up
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