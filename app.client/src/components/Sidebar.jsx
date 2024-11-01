import './Sidebar.css';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <aside className={`sidebar ${sidebarOpen ? 'opened' : ''}`}>
            <nav>
                <ul>
                    <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <img className="hero-image" width="70px" src="images/smarket.png" alt="Logo" />
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
    );
};

export default Sidebar;
