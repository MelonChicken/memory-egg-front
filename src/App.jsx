// <main /> tests whether .app-page from global.css works.
// <div /> tests whether centered layout works.
// <section className="panel stack-md" /> tests whether reusable panel and vertical spacing classes work.
// <h1 /> tests title style
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OpeningPage from "./pages/OpeningPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import WritePostPage from "./pages/WritePostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EggDashboardPage from "./pages/EggDashboardPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import MemoryArchivePage from "./pages/MemoryArchivePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EggDashboardPage />} />
        <Route path="/write" element={<WritePostPage />} />
        <Route path="/nest" element={<EggDashboardPage />} />
        <Route path="/archive" element={<MemoryArchivePage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;