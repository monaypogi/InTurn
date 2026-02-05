import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Intern/Header";
import Sidebar from "../components/Intern/Sidebar";
import "../styles/layout.css";

export default function InternLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      <div className={`layout ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );

}
