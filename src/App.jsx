// <main /> tests whether .app-page from global.css works.
// <div /> tests whether centered layout works.
// <section className="panel stack-md" /> tests whether reusable panel and vertical spacing classes work.
// <h1 /> tests title style

import OpeningPage from "./pages/OpeningPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return <ProfilePage />;
  /*
  return ( 
    <main className="app-page"> 
      <div className="page-center">
        <section className="panel stack-md" style={{ padding: "2rem", maxWidth: "520px" }}>
          <h1 className="page-title">Nacimiento - My Egg</h1>
          <p className="muted-text">
            Frontend setup is ready.
          </p>
          <button className="btn" type="button">
            Continue
          </button>
        </section>
      </div>
    </main>
  );
  */
}

export default App;