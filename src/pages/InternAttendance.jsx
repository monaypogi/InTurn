import WelcomeCard from "../components/Intern/WelcomeCard";
import MonthlySummary from "../components/Intern/MonthlySummary";
import MonthlyOverallSummary from "../components/Intern/MonthlyOverallSummary";
import { useAttendance } from "../context/AttendanceContext";

import { useEffect } from "react";
import { useState } from "react";

import "../styles/attendance.css";

export default function InternAttendance() {
  const [activeTab, setActiveTab] = useState("history");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const { attendance, timeOut } = useAttendance();
  const attendanceData = attendance;



  const today = new Date().toDateString();

  const todayRecord = attendance.find(
    record => record.date === today
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyRecords = attendance.filter(record => {
    const recordDate = new Date(record.date);

    return (
      recordDate.getMonth() === currentMonth &&
      recordDate.getFullYear() === currentYear
    );
  });

  const monthlyHours = monthlyRecords.reduce((total, record) => {
    const hours = Number(record.hours) || 0

    return total + hours;
  }, 0);

  const monthlyLate = monthlyRecords.filter(r => r.status === "late").length;
  const monthlyAbsent = monthlyRecords.filter(r => r.status === "absent").length;
  const monthlyOntime = monthlyRecords.filter(r => r.status === "ontime").length;
  const monthlyUndertime =
    monthlyRecords.filter(r => r.status === "undertime").length;



  const totalHours = attendance.reduce((total, record) => {
    const hours = Number(record.hours) || 0

    return total + hours;
  }, 0);

  const todayHours =
    todayRecord ? `${todayRecord.hours} Hours` : "0 Hours";

  const todayStatus = todayRecord?.status || "absent";

  const filteredAttendance =
    activeFilter === "all"
      ? attendanceData
      : attendanceData.filter(row => row.status === activeFilter);

  const totalPages = Math.ceil(filteredAttendance.length / ITEMS_PER_PAGE);

  const paginatedAttendance = filteredAttendance.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handleTimeOut = () => {
    const success = timeOut();

    if (success) {
      showToast("Time out recorded successfully!", "success");
    } else {
      showToast("Cannot time out yet or already timed out.", "error");
    }

  };



  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  return (
    <div className="attendance-page">
      <WelcomeCard title="Attendance" subtitle="Thursday, January 29, 2026 • 09:21:02 AM" />


      {activeTab === "history" && (
        <div className="attendance-summary-row">
          {/* Time In */}
          <div className="card time-card">
            <p className="label">Time in:</p>

            <div className="time-center">
              <h3>{todayRecord?.timeIn || "--"}</h3>

              <span className="subtext success">Time in recorded!</span>
            </div>
          </div>


          {/* Total Hours */}
          <div className="card total-hours-card">
            <p className="label">Total Hours</p>
            <h3>{totalHours} hours</h3>

            <button
              className="time-action-btn"
              onClick={handleTimeOut}
              disabled={!todayRecord || todayRecord.timeOut !== "----"}
            >
              {todayRecord?.timeOut !== "----" ? "Timed Out" : "Time Out"}
            </button>


          </div>

          {/* Hours Worked */}
          <div className="card worked-hours-card">
            <p className="label">Hours Worked</p>

            <div className="hours-row">
              <div className="hours-box">
                {todayHours}
              </div>
              <div className={`state-pill ${todayStatus}`}>
                {todayStatus === "ontime" && "On Time"}
                {todayStatus === "late" && "Late"}
                {todayStatus === "absent" && "Absent"}
                {todayStatus === "undertime" && "Undertime"}
              </div>

            </div>

            {/* legend stays for reference */}
            <div className="status-legend">
              <span className="legend late">Late</span>
              <span className="legend ontime">On Time</span>
              <span className="legend absent">Absent</span>
              <span className="legend undertime">Undertime</span>
            </div>

          </div>

        </div>

      )}
      {activeTab === "monthly" && (
        <MonthlyOverallSummary
          hours={monthlyHours}
          late={monthlyLate}
          absent={monthlyAbsent}
          ontime={monthlyOntime}
          undertime={monthlyUndertime}
        />
      )}


      {/* ATTENDANCE TABLE */}
      <div className="card attendance-table-card">
        <div className="attendance-header">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Attendance History
            </button>

            <button
              className={`tab ${activeTab === "monthly" ? "active" : ""}`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly Summary
            </button>
          </div>

          {activeTab === "history" && (
            <select
              className="filter-select"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="ontime">On Time</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
              <option value="undertime">Undertime</option>
            </select>
          )}
        </div>

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <>

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Hours Worked</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedAttendance.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.timeIn}</td>
                    <td>{row.timeOut}</td>
                    <td>{row.hours}</td>
                    <td>
                      <span className={`state-pill small ${row.status}`}>
                        {row.status === "ontime" && "On Time"}
                        {row.status === "late" && "Late"}
                        {row.status === "absent" && "Absent"}
                        {row.status === "undertime" && "Undertime"}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredAttendance.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", opacity: 0.6 }}>
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Prev
                </button>

                <span>
                  {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        {activeTab === "monthly" && <MonthlySummary records={monthlyRecords} />
        }


      </div>
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}


    </div>
  );
}
