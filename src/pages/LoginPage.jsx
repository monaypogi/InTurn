import { useState } from 'react';
import { authAPI } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async () => {
    setErrors({});
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      });
      return;
    }

    setIsLoading(true); 

    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);

      if (onLogin) {
        onLogin({ 
          email: user.email, 
          role: user.isAdmin ? 'admin' : 'intern', 
          roleId: user.isAdmin ? user.adminId : user.internId
        });
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid credentials';
      setErrors({ auth: message });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">InTurn</h1>
          <p className="text-gray-600 mt-2">Intern Management System</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>

        {errors.auth && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded border border-red-200">
            {errors.auth}
          </div>
        )}
        
        <Input 
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          error={errors.email}
          required
        />
        
        <Input 
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
          required
        />
        
        <Button 
          text={isLoading ? "Logging in..." : "Login"} 
          onClick={handleLogin} 
          type="primary"
          className="w-full mt-2"
          disabled={isLoading}
        />
        
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;