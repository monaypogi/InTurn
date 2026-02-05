import "../styles/documents.css";
import { FaFileAlt, FaDownload, FaSearch } from "react-icons/fa";
import WelcomeCard from "../components/Intern/WelcomeCard";
import { useState, useEffect } from "react";

export default function InternDocuments() {

  const ITEMS_PER_PAGE = 10;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const documents = [
    { name: "Non-Disclosure Agreement (NDA)" },
    { name: "Business Permit" },
    { name: "Internship Agreement" },
    { name: "Non-Disclosure Agreement (NDA)" },
    { name: "Business Permit" },
    { name: "Internship Agreement" },
    { name: "Non-Disclosure Agreement (NDA)" },
    { name: "Business Permit" },
    { name: "Internship Agreement" },
    { name: "Non-Disclosure Agreement (NDA)" },
    { name: "Business Permit" },
    { name: "Internship Agreement" }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="documents-page">

      {/* Welcome Banner */}
      <WelcomeCard title="Documents" />

      {/* Main Card */}
      <div className="documents-card">

        {/* Card Header */}
        <div className="documents-card-header">
          <h3>Documents & Requirements</h3>

          <div className="documents-actions">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="documents-table-wrapper">

          <table className="documents-table">

            <thead>
              <tr>
                <th>Document Name</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>

            <tbody>

              {paginatedDocuments.map((doc, index) => (
                <tr key={index}>
                  <td>
                    <div className="doc-name">
                      <FaFileAlt />
                      <span>{doc.name}</span>
                    </div>
                  </td>

                  <td style={{ textAlign: "right" }}>
                    <button className="download-btn">
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan="2" style={{ opacity: 0.6, textAlign: "center" }}>
                    No documents found
                  </td>
                </tr>
              )}

            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
