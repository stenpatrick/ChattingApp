import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);

    document.title = "Login";

    // Don't ask an already logged-in user to login over and over again
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/BudgetPage";
        }
    }, []);

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter);
        const dataToSend = {};

        for (const [key, value] of formData.entries()) {
            dataToSend[key] = value;
        }

        if (dataToSend.Remember === "on") {
            dataToSend.Remember = true;
        }

        // Check if reCAPTCHA was completed
        if (!captchaToken) {
            const messageEl = document.querySelector(".message");
            messageEl.innerHTML = "Please complete the CAPTCHA";
            return;
        }

        dataToSend["g-recaptcha-response"] = captchaToken;

        console.log("login data before send: ", dataToSend);
        const response = await fetch("api/app/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "Application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", dataToSend.Email);
            document.location = "/";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            messageEl.innerHTML = "Something went wrong, please try again";
        }

        console.log("login error: ", data);

        // Reset reCAPTCHA
        recaptchaRef.current.reset();
        setCaptchaToken(null);
    };

    return (
        <section className='login-page-wrapper page'>
            <div className='login-page'>
                <header>
                    <h1>Login Page</h1>
                </header>
                <p className='message'></p>
                <div className='form-holder'>
                    <form action="#" className='login' onSubmit={loginHandler}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name='Email' id='email' required />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name='Password' id='password' required />
                        <br />
                        <input type="checkbox" name='Remember' id='remember' />
                        <label htmlFor="remember">Remember Password?</label>
                        <br />
                        <br />
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdQ6EEqAAAAAMxkuuLvX7X-NHCW3Ax0KP_gIKTM"
                            onChange={onCaptchaChange}
                        />
                        <br />
                        <input type="submit" value="Login" className='login btn' />
                    </form>
                </div>
                <div className='my-5'>
                    <span>Or </span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </section>
    );
}

export default Login;
