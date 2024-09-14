import { Link } from 'react-router-dom'
import './hero.css'

function Hero() {
    return (
        <main>
            <div className="image-overlay">
                <p className='main-content'>A Cupboard of all Your College Memories Along with Mine</p>
                <Link to="/blogs"className='hero-blogs'>See All the Blogs</Link>
            </div>
        </main>
    )
}

export default Hero