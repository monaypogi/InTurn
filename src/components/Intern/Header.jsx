import { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import "../../styles/layout.css";

export default function Header({ toggleSidebar }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <FaBars
            className="header-icon menu-icon"
            onClick={toggleSidebar}
          />
          <img src="/logo1.png" alt="Logo" className="logo" />
        </div>


        <div className="header-right">
          <FaBell
            className="header-icon"
            onClick={() => navigate("/intern/notifications")}
          />

          <div className="profile-wrapper" ref={dropdownRef}>
            <FaUserCircle
              className="header-icon"
              onClick={() => setShowDropdown(prev => !prev)}
            />

            {showDropdown && (
              <div className="profile-dropdown">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowProfileModal(true);
                  }}
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    setShowDropdown(false);

                    localStorage.removeItem("auth"); 
                    window.location.href = "/login"; 
                  }}
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </header>

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}
