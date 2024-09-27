import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './MainPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

function MainPage() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [inputAmount, setInputAmount] = useState(''); // State for input amount

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
        }));

        setData(chartData);
    };

    const handleInputChange = (event) => {
        setInputAmount(event.target.value); // Update input amount
    };

    const handleAddToBalance = () => {
        const amount = parseFloat(inputAmount);
        if (!isNaN(amount) && amount > 0) {
            setBalance(prevBalance => prevBalance + amount); // Update balance
            setTransactions(prevTransactions => [
                ...prevTransactions,
                { id: prevTransactions.length + 1, type: 'Deposit', amount: amount, date: new Date().toISOString(), icon: 'https://cdn-icons-png.flaticon.com/512/493/493389.png' }
            ]);
            setInputAmount(''); // Clear input field
        } else {
            alert("Please enter a valid positive number.");
        }
    };

    return (
        <div className={`main-page ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <aside className={`sidebar ${sidebarOpen ? 'opened' : ''}`}>
                <nav>
                    <ul>
                        <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <img className="hero-image" width="70px" src="https://ahhdaily.com/assets/images/shops/order-groceries-from-lidl.webp" alt="Logo" />
                        </li>
                        <li>
                            <div className="icon-background">
                                <span>🏠</span>
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

                {/* Balance Display */}
                <div className="balance-container">
                    <h2>Your Balance</h2>
                    <div className="balance">${balance.toFixed(2)}</div>
                </div>

                {/* Section for Adding Amount */}
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
                        <p><span className="hackbold">Expenses</span> -${totalExpenses.toFixed(2)} USD</p>
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