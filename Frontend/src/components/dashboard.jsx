import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // ⬇️ Move this outside useEffect so it can be reused in handleDelete
    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get("http://localhost:3000/api/expense", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setExpenses(res.data.expense || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError("Failed to load expenses.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [navigate]);


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && expenses.length === 0 && (
                <p>No expenses found. Start adding some!</p>
            )}

            <div className="space-y-4">
                {expenses.map((expense) => (
                    <div key={expense.id} className="p-4 bg-white shadow rounded">
                        <p className="text-lg font-semibold">{expense.title}</p>
                        <p className="text-sm text-gray-600">Category: {expense.category}</p>
                        <p className="text-sm">Amount: ₹{expense.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
