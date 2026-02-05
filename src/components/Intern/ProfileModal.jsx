import { useState } from "react";
import "../../styles/profile-modal.css";

export default function ProfileModal({ onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    email: "sarah.martinez@gmail.com",
    phone: "0990909090",
    emergencyPhone: "0202020202",
    emergencyName: "Maria Martinez",
    address: `676 College Avenue, Apt 12B
Los Angeles, CA 900212`,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    // later: send to backend
    setIsEditing(false);
  }

  return (
    <div className="modal-overlay">
      <div className="profile-modal">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-user">
            <div className="avatar">👤</div>
            <div>
              <h3>Sarah Martinez</h3>
              <p>Intern - 1404</p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="profile-body">

          {/* LEFT COLUMN (always view-only) */}
          <div className="profile-column">
            <div className="section-title">
              <h4>Personal Details</h4>
              <span className="view-only">View Only</span>
            </div>

            <label>Full Name</label>
            <input value="Sarah Martinez" disabled />

            <label>Gender</label>
            <input value="Female" disabled />

            <label>Date of Birth</label>
            <input value="March 20, 2002" disabled />

            <label>University / College</label>
            <input value="College of Manila" disabled />

            <label>Intern Role / Department</label>
            <input value="Software Developer" disabled />

            <label>Internship Start Date</label>
            <input value="February 16, 2026" disabled />
          </div>

          <div className="divider" />

          {/* RIGHT COLUMN (editable) */}
          <div className="profile-column">
            <div className="section-title">
              <h4>Contact Details</h4>

              {!isEditing ? (
                <span className="edit" onClick={() => setIsEditing(true)}>
                   Edit
                </span>
              ) : (
                <span className="edit" onClick={() => setIsEditing(false)}>
                  Cancel
                </span>
              )}
            </div>

            <label>Personal Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Emergency Contact</label>
            <input
              name="emergencyPhone"
              value={profile.emergencyPhone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Emergency Contact (Name)</label>
            <input
              name="emergencyName"
              value={profile.emergencyName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="profile-footer">
          <button
            className="save-btn"
            disabled={!isEditing}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
