import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="dashboard-header">
        <h1>Nacimiento - My Egg</h1>

        <div className="dashboard-user">
          <div className="dashboard-user-text">
            <span>USER NAME</span>
            <strong>N Days</strong>
          </div>
          <div className="dashboard-avatar" aria-label="User profile placeholder" />
        </div>
      </header>
  );
}