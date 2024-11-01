import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import StartPage from './components/StartPage';
import BudgetPage from './components/BudgetPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='/' element={<StartPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path='/StartPage' element={<StartPage />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/BudgetPage' element={<BudgetPage />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={
                <div>
                    <header>
                        <h1>Not Found</h1>
                    </header>
                    <p>
                        <a href="/">Back to StartPage</a>
                    </p>
                </div>
            } />
        </Route>
    )
);

function App() {
    const isLogged = localStorage.getItem("user");
    const logout = async () => {
        const response = await fetch("/api/app/logout", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.removeItem("user");

            alert(data.message);

            document.location = "/login";
        } else {
            console.log("could not logout: ", response);
        }
    };
    return (
        <section>
            <div className='top-nav'>
                {
                    isLogged ?
                        <span className='item-holder'>
                            <a href="/StartPage">StartPage</a>
                            <a href="/BudgetPage">Budget</a>
                            <a href="/Account">Admin</a>
                            <span onClick={logout}>Log Out</span>
                        </span> :
                        <span className='item-holder'>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </span>
                }
            </div>

            <RouterProvider router={router} />
        </section>
    );
}

export default App;