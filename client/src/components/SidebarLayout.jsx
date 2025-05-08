// src/components/SidebarLayout.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiMenu, FiX } from "react-icons/fi";

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: isOpen ? "200px" : "0",
          overflow: "hidden",
          backgroundColor: "#1a202c",
          color: "#fff",
          transition: "width 0.3s ease",
          paddingTop: "1rem",
        }}
      >
        <nav style={{ paddingLeft: "1rem" }}>
          <Link to="/homepage" style={{ display: "block", margin: "1rem 0", color: "#fff" }}>
            Home
          </Link>
          <Link to="/account" style={{ display: "block", margin: "1rem 0", color: "#fff" }}>
            Account
          </Link>
          <Link to="/settings" style={{ display: "block", margin: "1rem 0", color: "#fff" }}>
            Settings
          </Link>
          <Link to="/pricing" style={{ display: "block", margin: "1rem 0", color: "#fff" }}>
            Pricing
          </Link>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#E53E3E",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#edf2f7",
            padding: "1rem",
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              fontSize: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 style={{ margin: 0, fontWeight: "bold" }}>Alexa</h1>
        </header>

        <main style={{ padding: "2rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;