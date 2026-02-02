import Card from '../components/Card';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Interns">
          <p className="text-4xl font-bold text-blue-600">24</p>
        </Card>
        <Card title="Active Tasks">
          <p className="text-4xl font-bold text-green-600">12</p>
        </Card>
        <Card title="Pending Reviews">
          <p className="text-4xl font-bold text-orange-600">5</p>
        </Card>
      </div>
      {/* Person B will build out the rest */}
    </div>
  );
}

export default AdminDashboard;