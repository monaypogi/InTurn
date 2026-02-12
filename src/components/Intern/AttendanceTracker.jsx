import { FaClock } from "react-icons/fa";
import { useAttendance } from "../../context/AttendanceContext";
import { useState, useEffect } from "react";

export default function AttendanceTracker() {

  const { timeIn, logs, fetchLogs, loading } = useAttendance();

  const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD to match Laravel
  
  const todayRecord = (logs || []).find(
    record => record.work_date === todayStr
  );

 const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success"
});

// Fetch logs on mount to ensure data is fresh
  useEffect(() => {
    fetchLogs();
  }, []);

const handleTimeIn = async () => {
  const result = await timeIn();

  if (result.success) {
    showToast("Time in recorded successfully!", "success");
  } else {
    showToast("Failed to record time in", "error");
  }
};

const showToast = (message, type = "success") => {
  setToast({ show: true, message, type });

  setTimeout(() => {
    setToast({ show: false, message: "", type: "success" });
  }, 3000);
};
return (
  <>
    <div className="card attendance-card">

      {/* Card Header */}
      <div className="card-header">
        <h3>Attendance Tracker</h3>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="attendance-body">

          <div className="attendance-left">

            <div className="attendance-row">
              <span className="label">Today:</span>
              <span>{new Date().toDateString()}</span>
            </div>

            <div className="attendance-row">
              <span className="label">Time in:</span>
              <span>{todayRecord?.timeIn || "—"}</span>
            </div>

            <div className="attendance-row muted">
              <span className="label">Status:</span>
              <span>{todayRecord?.status || "Not Recorded"}</span>
            </div>

          </div>

          <div className="attendance-right">
            <div className="attendance-metric">
              <FaClock />
              <div>
                <p className="metric-label">Time in</p>
                <p className="metric-value">
                  {todayRecord?.timeIn || "--"}
                </p>
              </div>
            </div>

            <button
              className="primary-btn full-width"
              onClick={handleTimeIn}
              // disable if loading or a record already exists for today
              disabled={loading || !!todayRecord}
            >
              {loading ? "Processing..." : todayRecord ? "Timed In" : "Time In"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Toast */}
    {toast.show && (
      <div className={`toast ${toast.type}`}>
        {toast.message}
      </div>
    )}

  </>
);
}
