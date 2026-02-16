import { FaClock } from "react-icons/fa";
import { useAttendance } from "../../context/AttendanceContext";
import { useState, useEffect } from "react";

export default function AttendanceTracker() {

  const { timeIn, timeOut, logs, fetchLogs, loading, summary } = useAttendance();
  const [elapsedTime, setElapsedTime] = useState("00:00:00")

  const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD to match Laravel
  const todayRecord = (logs || []).find(
    record => record.work_date === todayStr
  );


  // live timer
  useEffect(() => {
    let interval;

    // Only run the timer if the user is currently Timed In but hasn't Timed Out
    if (todayRecord && todayRecord.time_in && !todayRecord.time_out) {
      interval = setInterval(() => {
        // Parse the time_in from Laravel (expected format: Y-m-d H:i:s or ISO)
        const fullDateTimeStr = `${todayRecord.work_date}T${todayRecord.time_in}`;
        const startTime = new Date(fullDateTimeStr).getTime();
        const now = new Date().getTime();
        const diff = now - startTime;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setElapsedTime(
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
          );
        }
      }, 1000);
    } else if (todayRecord?.time_out) {
      // If already timed out, show the final total hours from the database
      setElapsedTime(`${Number(todayRecord.total_hours).toFixed(2)} hrs (Done)`);
    } else {
      setElapsedTime("00:00:00");
    }

    return () => clearInterval(interval);
  }, [todayRecord]);

  console.log(todayRecord)
 const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success"
});

// Fetch logs on mount to ensure data is fresh
  useEffect(() => {
    fetchLogs();
  }, []);

const handleAttendanceAction = async () => {
  // If there is no record, we perform Time In
  if (!todayRecord) {
    const result = await timeIn();
    if (result.success) showToast("Time in recorded successfully!", "success");
    else showToast(result.message || "Failed to record time in", "error");
  } 
  // If there is a record but NO time_out, we perform Time Out
  else if (todayRecord && !todayRecord.time_out) {
    const result = await timeOut();
    if (result.success) showToast("Time out recorded successfully!", "success");
    else showToast(result.message || "Failed to record time out", "error");
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
              <span>{todayRecord?.time_in || "—"}</span>
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
                <p className="metric-label">Elapsed Time</p>
                <p className="metric-value">
                  {elapsedTime}
                </p>
              </div>
            </div>

            <button
              className={`primary-btn full-width ${todayRecord?.time_out ? 'disabled' : ''}`}
              onClick={handleAttendanceAction}
              // Disable only if loading OR if the user has ALREADY timed out for the day
              disabled={loading || (todayRecord && todayRecord.time_out)}
            >
              {loading ? "Processing..." : 
                !todayRecord ? "Time In" : 
                !todayRecord.time_out ? "Time Out" : "Shift Completed"}
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
