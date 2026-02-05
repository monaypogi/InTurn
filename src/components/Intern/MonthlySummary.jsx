import MonthlyCard from "./MonthlyCard";

export default function MonthlySummary({ records }) {

  const monthlyMap = {};

  records.forEach(record => {
    const date = new Date(record.date);
    const monthName = date.toLocaleString("default", { month: "long" });

    if (!monthlyMap[monthName]) {
      monthlyMap[monthName] = {
        month: monthName,
        ontime: 0,
        late: 0,
        absent: 0,
        undertime: 0
      };
    }

    monthlyMap[monthName][record.status]++;
  });

  const monthlyData = Object.values(monthlyMap);

  return (
    <div className="monthly-summary">
      <h3 className="section-title">Monthly Summary</h3>

      <div className="monthly-grid">
        {monthlyData.map((month, i) => (
          <MonthlyCard key={i} data={month} />
        ))}
      </div>
    </div>
  );
}
