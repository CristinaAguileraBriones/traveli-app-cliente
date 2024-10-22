import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import './Navbar.css';  // Importamos el archivo CSS con los estilos

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken"); // removemos el token

      await authenticateUser(); // validamos el token

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/contact">Contacto</Link>
      {!isLoggedIn && <Link className="nav-link" to="/signup">Registro</Link>}
      {!isLoggedIn && <Link className="nav-link" to="/login">Acceso</Link>}
      {isLoggedIn && <Link className="nav-link" to="/user-profile">Mi perfil</Link>}
      {isLoggedIn && <span className="nav-link logout-link" onClick={handleLogout}>Cerrar sesión</span>}
    </nav>
  );
}

export default Navbar;
