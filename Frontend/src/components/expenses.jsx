import React, { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/api/expense', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setExpenses(res.data.expense); // assuming your backend sends { expense: [...] }
            } catch (error) {
                console.error("Error fetching expenses:", error);
                alert("Failed to fetch expenses");
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Your Expenses</h1>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <ul className="space-y-3">
                    {expenses.map((exp) => (
                        <li key={exp.id} className="p-3 border rounded shadow bg-white">
                            <div><strong>Title:</strong> {exp.title}</div>
                            <div><strong>Amount:</strong> ₹{exp.amount}</div>
                            <div><strong>Category:</strong> {exp.category}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Expenses;
