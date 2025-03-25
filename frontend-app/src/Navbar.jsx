import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1><Link to="/">Blockchain in Medicine</Link></h1>
            <div className="links">
                <Link to="/">Home</Link>
                <br />
                <Link to="/signIn">Sign In</Link>
                <br />
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;