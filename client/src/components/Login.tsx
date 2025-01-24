import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login, selectAuth, logout, loginSuccess } from '../store/authSlice';
import { z } from "zod";
import { useNavigate } from 'react-router-dom';

// Zod schema form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate inputs using Zod
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }
    // Clear errors if validation passes
    setErrors({});
  
    try {
      // Call the backend API to log in
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      } 
      const data = await response.json();
  
      // Extracttoken and save it
      const { access_token: token } = data;
      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);
  
        // Dispatch loginSuccess to update Redux state
        dispatch(loginSuccess(token));
  
        // navigate to another page after successful login
        navigate('/');
      } else {
        throw new Error('Token not received');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({ email: '', password: 'Invalid email or password' });
    }
  };
  
  return (
    <>
      <form onSubmit={handleLogin} className="mt-6">
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* API Errors */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
