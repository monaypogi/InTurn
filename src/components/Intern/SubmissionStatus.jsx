import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

import { useDocuments } from "../../context/DocumentsContext";

export default function SubmissionStatus() {
  const navigate = useNavigate();
  const { documents } = useDocuments();

  const handleViewDetails = (type) => {
    navigate("/intern/reports", {
      state: {
        openFromDashboard: true,
        submissionType: type
      }
    });
  };

  const latestDaily = documents
    .filter(doc => doc.type === "Daily Report")
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const latestDocument = documents
    .filter(doc => doc.type === "Document")
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];



  return (
    <div className="card submission-card">
      <h3>Submission Status</h3>

      <div className="submission-list">

        {latestDaily && (
          <div className="submission-item">
            <div className="submission-left">
              <FaFileAlt className="submission-icon" />
              <div className="submission-info">
                <h4>Daily Report</h4>
                <p>
                  Status:
                  <span className={`status-text ${latestDaily.status.toLowerCase()}`}>
                    {latestDaily.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="submission-right">
              <span className="submission-time">{latestDaily.date}</span>
              <button
                className="view-details"
                onClick={() => handleViewDetails("Daily Report")}
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {latestDocument && (
          <div className="submission-item">
            <div className="submission-left">
              <FaFileAlt className="submission-icon" />
              <div className="submission-info">
                <h4>Document</h4>
                <p>
                  Status:
                  <span className={`status-text ${latestDocument.status.toLowerCase()}`}>
                    {latestDocument.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="submission-right">
              <span className="submission-time">{latestDocument.date}</span>
              <button
                className="view-details"
                onClick={() => handleViewDetails("Document")}
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {documents.length === 0 && (
          <p style={{ opacity: 0.6 }}>No submissions yet</p>
        )}

      </div>

    </div>
  );
}
