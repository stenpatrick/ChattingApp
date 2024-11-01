import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './MainPage.css';
import Sidebar from './Sidebar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

function MainPage() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [inputAmount, setInputAmount] = useState('');

    const ICON_MAP = {
        Shopping: 'https://cdn-icons-png.flaticon.com/256/833/833314.png',
        Food: 'https://cdn-icons-png.freepik.com/256/857/857681.png?semt=ais_hybrid',
        Transport: 'https://cdn-icons-png.flaticon.com/256/725/725989.png',
        Salary: 'https://cdn-icons-png.flaticon.com/512/493/493389.png',
        Uncategorized: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/question-mark-46-1179676.png?f=webp&w=256',
        Deposit: 'https://cdn-icons-png.flaticon.com/256/725/725989.png',
    };

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchBalance = () => {
        setBalance(1200.50); // Example balance
    };

    const fetchTransactions = () => {
        const fetchedTransactions = [
            { id: 1, type: 'Shopping', amount: -350, date: '2024-09-01T14:30:00Z' },
            { id: 2, type: 'Food', amount: -50, date: '2024-09-02T12:00:00Z' },
            { id: 3, type: 'Transport', amount: -30, date: '2024-09-03T09:00:00Z' },
            { id: 4, type: 'Salary', amount: 1000, date: '2024-09-04T15:00:00Z' },
            { id: 5, type: 'Uncategorized', amount: -100, date: '2024-09-05T08:00:00Z' },
            { id: 6, type: 'Food', amount: -70, date: '2024-09-06T18:00:00Z' },
            { id: 7, type: 'Transport', amount: -50, date: '2024-09-07T07:30:00Z' },
        ];

        const updatedTransactions = fetchedTransactions.map(transaction => ({
            ...transaction,
            icon: ICON_MAP[transaction.type] || ICON_MAP['Uncategorized'], // Fallback to Uncategorized icon if type not found
        }));

        setTransactions(updatedTransactions);
        calculateData(updatedTransactions);
    };

    const calculateData = (transactions) => {
        const expenses = transactions.filter(transaction => transaction.amount < 0);
        const total = expenses.reduce((accumulatedTotal, transaction) => accumulatedTotal + Math.abs(transaction.amount), 0);
        setTotalExpenses(total);

        const categoryTotals = expenses.reduce((acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + Math.abs(transaction.amount);
            return acc;
        }, {});

        const chartData = Object.keys(categoryTotals).map(key => ({
            name: key,
            value: categoryTotals[key],
            icon: ICON_MAP[key], // Add icon to the data
        }));

        setData(chartData);
    };

    const handleInputChange = (event) => {
        setInputAmount(event.target.value);
    };

    const handleAddToBalance = () => {
        const amount = parseFloat(inputAmount);
        if (!isNaN(amount) && amount > 0) {
            setBalance(prevBalance => prevBalance + amount);
            setTransactions(prevTransactions => [
                ...prevTransactions,
                { id: prevTransactions.length + 1, type: 'Deposit', amount: amount, date: new Date().toISOString(), icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' }
            ]);
            setInputAmount('');
        } else {
            alert("Please enter a valid positive number.");
        }
    };

    return (
        <div className={`main-page ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="content">
                <header className="header">
                    <h1>Your Savings Overview</h1>
                </header>

                {/* Balance Display */}
                <div className="balance-container">
                    <h2>Your Balance</h2>
                    <div className="balance">${balance.toFixed(2)}</div>
                </div>

                {/* New Section for Adding Amount */}
                <div className="add-balance-container">
                    <h2>Transfer Money</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            value={inputAmount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            min="0"
                        />
                        <button onClick={handleAddToBalance}>Add</button>
                    </div>
                </div>

                {/* Transaction History and Chart */}
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

                    {/* Pie Chart for Transaction Breakdown */}
                    <div className="chart-container">
                        <h2>Transaction Breakdown</h2>
                        <p><span className="hackbold">Total Expenses</span> -${totalExpenses.toFixed(2)} USD</p>

                        {/* Pie Chart */}
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

                        {/* List of Categories and Amounts */}
                        <ul className="category-list">
                            {data.map((entry) => (
                                <li key={entry.name} className="category-item">
                                    <img src={entry.icon} alt={entry.name} className="category-icon" />
                                    {entry.name}: ${entry.value.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;