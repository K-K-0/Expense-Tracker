import React, { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/expense", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(res.data.expense);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            alert("Failed to fetch expenses");
        }
    };

   

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Your Expenses</h1>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <ul className="space-y-4">
                    {expenses.map((exp) => (
                        <li
                            key={exp.id}
                            className="flex justify-between items-center p-4 border rounded shadow bg-white"
                        >
                            <div>
                                <p><strong>Title:</strong> {exp.title}</p>
                                <p><strong>Amount:</strong> ₹{exp.amount}</p>
                                <p><strong>Category:</strong> {exp.category}</p>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Expenses;
