import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Ensure recharts is installed
import './MainPage.css'; // Importing CSS for styling

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

function MainPage() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchBalance = () => {
        setBalance(1200.50); // Example balance
    };

    const fetchTransactions = () => {
        const fetchedTransactions = [
            { id: 1, type: 'Shopping', amount: -350, date: '2024-09-01T14:30:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 2, type: 'Food', amount: -50, date: '2024-09-02T12:00:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 3, type: 'Transport', amount: -30, date: '2024-09-03T09:00:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 4, type: 'Salary', amount: 1000, date: '2024-09-04T15:00:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 5, type: 'Utilities', amount: -100, date: '2024-09-05T08:00:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 6, type: 'Food', amount: -70, date: '2024-09-06T18:00:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
            { id: 7, type: 'Transport', amount: -50, date: '2024-09-07T07:30:00Z', icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' },
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
        <div className={`main-page ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <aside className={`sidebar ${sidebarOpen ? 'opened' : ''}`}>
                <div className="logo">Savings App</div>
                <nav>
                    <ul>
                        <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <div className="icon-background">
                                <span>🏠</span> {/* Placeholder for an actual icon */}
                            </div>
                            {sidebarOpen && "Dashboard"}
                        </li>
                        <li>
                            <div className="icon-background">
                                <span>📊</span>
                            </div>
                            {sidebarOpen && "Transactions"}
                        </li>
                        <li>
                            <div className="icon-background">
                                <span>⚙️</span>
                            </div>
                            {sidebarOpen && "Settings"}
                        </li>
                        <li>
                            <div className="icon-background">
                                <span>🚪</span>
                            </div>
                            {sidebarOpen && "Logout"}
                        </li>
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
                                    <div className="icon-background">
                                        <img src={transaction.icon} alt={transaction.type} className="transaction-icon" />
                                    </div>
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
                                outerRadius={100}
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
