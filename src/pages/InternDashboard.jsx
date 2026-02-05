import Card from '../components/Card';
import LogoutButton from '../components/LogoutButton';

function InternDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Intern Dashboard</h1>
        <LogoutButton />
      </div>
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