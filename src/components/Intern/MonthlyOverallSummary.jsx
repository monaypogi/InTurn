import {
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowDown,
  FaUserClock
} from "react-icons/fa";
export default function MonthlyOverallSummary({
  hours,
  late,
  absent,
  ontime,
  undertime
}) {

  return (
    <div className="monthly-overall-summary card">
      <div className="overall-row">

        {/* HEADER ROW */}
        <div className="overall-header">
          <div className="header-left">
            <h3>Overall Summary</h3>

            <select className="year-select">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          <button className="download-btn">⬇ Download DTR</button>
        </div>

        {/* CONTENT */}
        <div className="overall-content">

          <div className="summary-card total">
            <div className="card-icon">
              <FaClock />
            </div>
            <p>Total Hours</p>
            <h3>{hours} / 600</h3>

          </div>

          <div className="summary-card present">
            <div className="card-icon">
              <FaCheckCircle />
            </div>
            <p>Present Days</p>
            <h3>{ontime} / 75</h3>

          </div>

          <div className="summary-card late">
            <div className="card-icon">
              <FaUserClock />
            </div>
            <p>Late Days</p>
            <h3>{late}</h3>

          </div>

          <div className="summary-card absent">
            <div className="card-icon">
              <FaExclamationTriangle />
            </div>
            <p>Absent Days</p>
            <h3>{absent}</h3>

          </div>

          <div className="summary-card undertime">
            <div className="card-icon">
              <FaArrowDown />
            </div>
            <p>Undertime</p>
            <h3>{undertime || 0}</h3>

          </div>

        </div>

      </div>
    </div>
  );
}
