// <main /> tests whether .app-page from global.css works.
// <div /> tests whether centered layout works.
// <section className="panel stack-md" /> tests whether reusable panel and vertical spacing classes work.
// <h1 /> tests title style
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./api/userApi";

import Header from "./components/header.jsx";

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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// 1. Create a wrapper component inside the Router context
function AppContent() {
  const location = useLocation();

  // Define paths where you don't want the header
  const hideHeaderPaths = ["/shop"]; 

  return (
    <>
      {/* Only render Header if the current path isn't in the hide list */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      
      <main style={{ padding: "1rem" }}>
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
      </main>
    </>
  );
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/nest" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <OpeningPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/nest"
          element={
            <ProtectedRoute>
              <EggDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WritePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <ProtectedRoute>
              <MemoryArchivePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <ViewPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App