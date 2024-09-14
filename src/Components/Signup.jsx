import axios from "axios";
import { useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom";
import './signup.css'


function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("https://collegediaries-production-1816.up.railway.app/api/signup", {
                name,
                email,
                password,
                confirmpassword
            })
            setLoading(false);
            if (typeof response.data.errors != 'undefined') {
                setError(response.data.errors.errors[0].msg);
            } else {
                setSuccess('User Signed in successfully')
            }
        } catch (err) {
            setError(err)
        }
    }


    return (
        <div className="form-wrapper">
            <form method="POST">
                <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Your Name"></input>
                <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} id="signup-email" placeholder="Enter your Email" />
                <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} id="password" placeholder="Enter Your Password" />
                <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} name="confirmpassword" id="confirmpassword" placeholder="confirm password" />
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
                <div className="user-text">
                    <p className="login-text">or go to <Link className="login-link" to="/login">Login</Link> page</p>
                    <div className="loading">{loading && "Loading .."}</div>
                    <div className="error">{error}</div>
                    <div className="success">{success}</div>
                </div>
            </form>
        </div>
    )
}

export default Signup