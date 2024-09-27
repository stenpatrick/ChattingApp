import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);

    document.title = "Register";

    // Don't ask an already registered user to register over and over again
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        const form_ = e.target;
        const formData = new FormData(form_);
        const dataToSend = {};

        for (const [key, value] of formData.entries()) {
            dataToSend[key] = value;
        }

        // Create username
        const newUserName = dataToSend.Name.trim().split(" ");
        dataToSend.UserName = newUserName.join("");

        // Check if reCAPTCHA was completed
        if (!captchaToken) {
            const messageEl = document.querySelector(".message");
            messageEl.innerHTML = "Please complete the CAPTCHA";
            return;
        }

        dataToSend["g-recaptcha-response"] = captchaToken;

        const response = await fetch("api/app/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.location = "/login";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            let errorMessages = "<div>Attention please:</div><div class='normal'>";
            data.errors.forEach(error => {
                errorMessages += error.description + " "
            });
            errorMessages += "</div>";
            errorMessages += "<div class='password-strength-warning'>" +
                "<p>Your password is too weak. Consider using a stronger password.</p>" +
                "<a href='https://neal.fun/password-game/' target='_blank' rel='noopener noreferrer'>Check out this password strength game for tips!</a>" +
                "</div>";
            messageEl.innerHTML = errorMessages;
        }

        // Password strength recommendation message
        const passwordInput = form_.querySelector('#password');
        if (passwordInput) {
            const result = zxcvbn(passwordInput.value);
            if (result.score < 3) {
            }
        }
        console.log("register error: ", data);

        // Reset reCAPTCHA
        recaptchaRef.current.reset();
        setCaptchaToken(null);
    };

    return (
        <section className='register-page-wrapper page'>
            <div className='register-page'>
                <header>
                    <h1>Register Page</h1>
                </header>
                <p className='message'></p>
                <div className='form-holder'>
                    <form action="#" className='register' onSubmit={registerHandler}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" name='Name' id='name' required />
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name='Email' id='email' required />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name='PasswordHash' id='password' required />
                        <br />
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdQ6EEqAAAAAMxkuuLvX7X-NHCW3Ax0KP_gIKTM"
                            onChange={onCaptchaChange}
                        />
                        <br />
                        <input type="submit" value="Register" className='register btn' />
                    </form>
                </div>
                <div className='my-5'>
                    <span>Or </span>
                    <a href="/login">Login</a>
                </div>
            </div>
        </section>
    );
}

export default Register;
