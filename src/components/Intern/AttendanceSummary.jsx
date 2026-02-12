import { useAttendance } from "../../context/AttendanceContext";

export default function AttendanceSummary() {

  const { summary, loading } = useAttendance();

  if (loading || !summary){
    return(<div className="card attendance-summary-card">
        <p>Loading attendance summary...</p>
      </div>
    );
  }
  
  console.log(summary)
  // if stats is still empty or undefined
  if (!summary || typeof summary !== 'object') {
    return <div className="card">No stats found.</div>;
  }

  return (
    <div className="card attendance-summary-card">
      <div>
        <h4>Present</h4>
        <p>{summary.present_days || 0} days</p>
      </div>

      <div>
        <h4>Late</h4>
        <p>{summary.late_days || 0} day{summary.late !== 1 && "s"}</p>
      </div>

      <div>
        <h4>Absent</h4>
        <p>{summary.absent_days || 0} days</p>
      </div>

      <div>
        <h4>Total Rendered</h4>
        <p>{Number(summary.total_hours || 0).toFixed(2)} hrs</p>
      </div>
    </div>
  );
}
