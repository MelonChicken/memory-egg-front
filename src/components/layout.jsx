import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function layout() {
  return (
    <div className="app-layout">
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}