import DonutChart from "./DonutChart";

export default function MonthlyCard({ data }) {
  const total =
    data.ontime + data.late + data.absent + data.undertime;

  return (
    <div className="card monthly-card">
      <h4>{data.month}</h4>

      <DonutChart data={data} />

      <p className="total-days">
        {total} working days
      </p>

      <div className="month-stats">
        <span className="ontime">On Time: {data.ontime}</span>
        <span className="late">Late: {data.late}</span>
        <span className="absent">Absent: {data.absent}</span>
        <span className="undertime">
          Undertime: {data.undertime}
        </span>
      </div>
    </div>
  );
}
