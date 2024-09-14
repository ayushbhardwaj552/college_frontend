
import axios from "axios";
import { useEffect, useState } from "react"
import './comment.css'
import { jwtDecode } from "jwt-decode";

function Comments({ id }) {
    const [comments, setComments] = useState([]);
    const [changecomment, setChangeComment] = useState(false);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleComment(e) {
        e.preventDefault();
        setChangeComment(!changecomment);
        const user = jwtDecode(localStorage.token);
        const response = await axios.post(`https://collegediaries-production-1816.up.railway.app/api/blog/${id}`, {
            content: comment,
            user: user.symbol,
            blog: id,
        });

        try {
            setLoading(true)
            const response = await axios.get(`https://collegediaries-production-1816.up.railway.app/api/blog/${id}`, {
                headers: myHeaders
            });
            const newComment = response.data.comments[response.data.comments.length - 1]; // Get the last comment from the response
            setComments([...comments, newComment]);
            setLoading(false)
        } catch (ERR) {
            console.log(ERR)
        }

    }

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token}`, // Add any other headers as needed
    };

    useEffect(() => {
        const getreq = async () => {
            setLoading(true)
            const response = await axios.get(`https://collegediaries-production-1816.up.railway.app/api/blog/${id}`, {
                headers: myHeaders
            });
            const bl = response.data.comments
            setComments(...comments, bl);
            setLoading(false)
        }
        getreq()
    }, [])




    return (
        <div className="blog-comments">
            <form method="POST">
                <input type="text" placeholder="Post A Comment" onChange={(e) => { setComment(e.target.value) }}></input>
                <button type="submit" onClick={handleComment}>POST</button>
            </form>
            <CheckLoading loading={loading} comments={comments} />


        </div>
    )
}



function CheckLoading({ loading, comments }) {
    if (loading) {
        return (
            <h1 className="comment-loading">
                Loading ...
            </h1>
        )
    } else {
        return (
            <ul className="comments-render">
                {

                    comments.map(elem => {
                        return (

                            <li className="blog-single-comment" key={elem._id}>
                                <p className="comment-content">{elem.content}</p>
                                <p className="comment-user">-{elem.user.name}</p>
                                </li>
                        )
                    })
                }
            </ul>
        )
    }

}



export default Comments