import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className='nav-link' to='/'>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className='nav-link' to='/products'>product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/addproduct'>Add product</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
