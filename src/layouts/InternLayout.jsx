import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Intern/Header";
import Sidebar from "../components/Intern/Sidebar";
import "../styles/layout.css";

export default function InternLayout({ internId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // default closed is better for mobile

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay show"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`layout ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
          }`}
      >
        <Sidebar sidebarOpen={sidebarOpen} />



        <main className="content">
          <div className="page-transition">
            <Outlet context={{ internId }}/>
          </div>
        </main>
      </div>
    </>
  );
}
