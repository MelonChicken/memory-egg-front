import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/userApi";
import { useCurrentUser } from "../hooks/useCurrentUser";
import "./header.css";

function getDaysSince(dateString) {
  if (!dateString) {
    return 0;
  }

  const createdDate = new Date(dateString);
  const today = new Date();

  const differenceMs = today - createdDate;
  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return Math.max(0, differenceDays);
}

export default function Header() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const nickname = user?.nickname || "User";
  const daysSinceJoin = getDaysSince(user?.created_at);
  const willBalance = Number(user?.will_balance || 0);

  function handleLogout() {
    logoutUser();
    navigate("/", { replace: true });
  }

  return (
    <header className="app-header">
      <Link className="app-header-brand" to="/nest">
        Nacimiento
      </Link>

      <nav className="app-header-nav" aria-label="Main navigation">
        <Link to="/nest">Nest</Link>
        <Link to="/write">Write</Link>
        <Link to="/archive">Archive</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/inventory">Inventory</Link>
      </nav>

      <div className="app-header-user-area">
        <span className="app-header-will">✧ {willBalance} Will</span>

        <Link className="app-header-profile" to="/profile">
          <span>{nickname}</span>
          <strong>{daysSinceJoin} Days</strong>
          <div className="app-header-avatar" aria-hidden="true" />
        </Link>

        <button
          className="app-header-logout"
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </header>
  );
}