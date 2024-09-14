import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {

            const response = await axios.post("https://collegediaries-production-1816.up.railway.app/api/login" , {
                email,
                password
            })
            setLoading(false);
            if(typeof response.data.errors != 'undefined') {
                setError(response.data.errors.errors[0].msg);
            } else if (typeof response.data.token != 'undefined') {
                localStorage.token = response.data.token;
                navigate('/')
            } else {
                setError(response.data.status);
            }
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div className="form-wrapper">
            <form method="POST">
                <input type="email" name="email" id="email" placeholder="enter your email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" name="password" id="password" placeholder="enter your password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit" onClick={handleSubmit}>Log In</button>
                <div className="user-text">
                    <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p>
                    <div className="loading">{loading && "Loading .."}</div>
                    <div className="error">{error}</div>
                </div>
            </form>
        </div>
    )
}

export default Login