import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Ensure recharts is installed
import './MainPage.css'; // Importing CSS for styling

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

function MainPage() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulate fetching balance and transactions
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchBalance = () => {
        // Replace this with your actual API call
        setBalance(1200.50); // Example balance
    };

    const fetchTransactions = () => {
        // Replace this with your actual API call
        const fetchedTransactions = [
            { id: 1, type: 'Shopping', amount: -350, date: '2024-09-01T14:30:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 2, type: 'Food', amount: -50, date: '2024-09-02T12:00:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 3, type: 'Transport', amount: -30, date: '2024-09-03T09:00:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 4, type: 'Salary', amount: 1000, date: '2024-09-04T15:00:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 5, type: 'Utilities', amount: -100, date: '2024-09-05T08:00:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 6, type: 'Food', amount: -70, date: '2024-09-06T18:00:00Z', icon: 'https://via.placeholder.com/40' },
            { id: 7, type: 'Transport', amount: -50, date: '2024-09-07T07:30:00Z', icon: 'https://via.placeholder.com/40' },
        ];
        setTransactions(fetchedTransactions);
        calculateData(fetchedTransactions);
    };

    const calculateData = (transactions) => {
        const categoryTotals = transactions.reduce((acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + Math.abs(transaction.amount);
            return acc;
        }, {});

        const chartData = Object.keys(categoryTotals).map(key => ({
            name: key,
            value: categoryTotals[key],
        }));

        setData(chartData);
    };

    return (
        <div className="main-page">
            <aside className="sidebar">
                <div className="logo">SavingsApp</div>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Transactions</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <header className="header">
                    <h1>Your Savings Overview</h1>
                </header>
                <div className="balance-container">
                    <h2>Your Balance</h2>
                    <div className="balance">${balance.toFixed(2)}</div>
                </div>
                <div className="overview-container">
                    <div className="transactions-container">
                        <h2>Transaction History</h2>
                        <ul className="transaction-list">
                            {transactions.map(transaction => (
                                <li key={transaction.id}>
                                    <img src={transaction.icon} alt={transaction.type} className="transaction-icon" />
                                    <div className="transaction-details">
                                        <span className="transaction-type">{transaction.type}</span>
                                        <span className="transaction-date">{new Date(transaction.date).toLocaleString()}</span>
                                    </div>
                                    <span className={`amount ${transaction.amount > 0 ? "income" : "expense"}`}>
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="chart-container">
                        <h2>Transaction Breakdown</h2>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={data}
                                cx={150}
                                cy={150}
                                labelLine={false}
                                outerRadius={130}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
