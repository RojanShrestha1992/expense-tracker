import React, { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const handleChange = (e) => {
         setFormData({
            ...formData,
            [e.target.name]: e.target.value
         });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData);
            alert("logged in successfully");
        }catch (error) {
            const message = error?.response?.data?.message || "Error logging in";
            console.error("Error logging in:", message, error);
            alert(message);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            className="w-full p-3 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            required
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
          />
        
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
