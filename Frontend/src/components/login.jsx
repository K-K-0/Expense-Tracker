import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



function Login() {
    const [form, setFrom] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFrom({
            ...form, 
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/login', form, {
                headers: {
                    'content-type': 'application/json',
                }
            })

            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert('Login failed');            
        }
    }

    return (
        <div>
            <input type="text" name="email" placeholder="email" value={form.email} onChange={handleChange}
            className="mb-3 p-2 border"/>
            <input type="text" name="password" placeholder="password" value={form.password} onChange={handleChange}
            className="mb-3 p-2 border"/>

            <button type="submit" onClick={handleLogin} className="bg-blue-800 text-white px-4 py-2 cursor-pointer">Login</button>
        </div>
    )
    
}

export default Login