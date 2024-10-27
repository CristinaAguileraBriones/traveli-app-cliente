import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/Navbar.css";  
function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken"); 

      await authenticateUser(); 

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      
      
      {!isLoggedIn && <Link className="nav-link" to="/signup">Registro</Link>}
      {!isLoggedIn && <Link className="nav-link" to="/login">Acceso</Link>}
      {isLoggedIn && <Link className="nav-link" to="/user-profile">Mi perfil</Link>}
      {isLoggedIn && <span className="nav-link logout-link" onClick={handleLogout}>Cerrar sesión</span>}
      <Link className="nav-link" to="/contact">Contacto</Link>
    </nav>
  );
}

export default Navbar;
