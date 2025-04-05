import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function AddExpense({ onExpenseAdded }) {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: ""
    });

    const navigate = useNavigate()
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3000/api/create",
                {
                    title: form.title,
                    amount: Number(form.amount),
                    category: form.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                navigate('/dashboard')
                setForm({ title: "", amount: "", category: "" });
                onExpenseAdded && onExpenseAdded(); // optional refresh
            }
        } catch (error) {
            console.error("Failed to add expense:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Add Expense</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
                Add Expense
            </button>
        </div>
    );
}

export default AddExpense;
