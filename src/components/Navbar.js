import React from 'react';
// import {Link} from "react-router-dom";
import { Outlet, Link,useLocation,useNavigate } from "react-router-dom";


function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        {/* <a className="navbar-brand" href="/about">Navbar</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>

          </ul>

        </div>
        {!localStorage.getItem('token')?<form class="d-flex">
         <Link to="/login" class="btn btn-primary mx-2" >Login</Link>
         <Link to="/signup" class="btn btn-primary mx-2" >Signup</Link>
      </form>:<button onClick={handleLogout} class="btn btn-primary mx-2" >Logout</button>}
      </div>
      
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar;