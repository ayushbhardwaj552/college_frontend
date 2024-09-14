import axios from "axios"
import { useEffect, useState } from "react"
import './blogget.css'
import { Link } from "react-router-dom";


function BlogGet() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const makereq = async () => {
            try {
                setLoading(true)
                const response = await axios.get("https://collegediaries-production-1816.up.railway.app/api/blog");
                const app = response.data.blogs;
                setLoading(false);
                setBlogs(app);
                console.log(blogs)
            } catch (err) {
                setError(err);
            }

        }
        makereq()

    }, [])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    if (loading) {
        return (<div className="blogsget-loading">
            Loading...
        </div>
        )
    }

    if (blogs.length == 0) {
        return (
            <div className="blogsget-loading">
                No Blogs Here Yet
            </div>
        )
    }

    return (
        <div className="blogs-wrapper">
            {
                blogs.map(element => {
                    return (
                        <Link to={`/blog/${element._id}`} key={element._id}className="card">

                                <p className="card-heading">{element.heading }</p>
                                <p id="card-author">{ " " + formatDate(element.date) +" "+  element.author}</p>
                        </Link>
                    )
                })

            }
        </div>
    )
}

export default BlogGet