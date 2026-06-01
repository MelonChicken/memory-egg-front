// <main /> tests whether .app-page from global.css works.
// <div /> tests whether centered layout works.
// <section className="panel stack-md" /> tests whether reusable panel and vertical spacing classes work.
// <h1 /> tests title style

import Layout from "./components/Layout.jsx";
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
        <Route path="/" element={<Layout />}>
          <Route index element={<EggDashboardPage />} />
          
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;