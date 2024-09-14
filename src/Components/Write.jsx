import axios from "axios"
import { useState } from "react";
import './write.css'






function Write() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        const myHeaders = {
            'Content-Type': 'application/json', // Adjust the content type based on your API requirements
            'Authorization': `Bearer ${localStorage.token}`, // Add any other headers as needed
        };
        try {
            setLoading(true)
            const response = await axios.post("https://collegediaries-production-1816.up.railway.app/api/blog", {
                heading,
                text,
                author
            }, { headers: myHeaders })
            setLoading(false);
            setSuccess(response.data.status);


        } catch (err) {
            setError(err)
        }
    }

    return (
        <div className="blog-create">
            <form method="POST">
                <input className="blog-heading" type="text" name="heading" id="heading" onChange={(e) => { setHeading(e.target.value) }} placeholder="Write the Heading motherfucker" />
                <textarea className="blog-content" type="text" name="text" id="text" onChange={(e) => { setText(e.target.value) }} placeholder="Write the Content motherfucker" />
                <input type="text" name="author" id="author" onChange={(e) => { setAuthor(e.target.value) }} placeholder="Enter the author" />
                <button className="blog-submit" type="submit" onClick={handleSubmit}>Post</button>
                <div className="user-text">
                    <div className="loading">{loading && "Loading .."}</div>
                    <div className="error">{error}</div>
                    <div className="success">{success}</div>
                </div>
            </form>

        </div>
    )
}

export default Write