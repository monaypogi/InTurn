import Card from '../components/Card';

function InternDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Intern Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="My Tasks">
          <p className="text-gray-600">You have 3 pending tasks</p>
        </Card>
        <Card title="My Progress">
          <p className="text-gray-600">75% completed</p>
        </Card>
      </div>
      {/* Person C will build out the rest */}
    </div>
  );
}

export default InternDashboard;