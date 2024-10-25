import { useContext, useState } from "react";
import service from "../../service/config.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("auth/login", userCredentials);
      console.log("Respuesta de la ruta login", response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/User-profile");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        //pagina de error
      }
    }
  };

  return (
    <div className="general">
      <div className="contenedor-login">
        <h1>Formulario de Acceso</h1>

        <form onSubmit={handleLogin}>
          <label>Correo Electronico:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />

          <br />

          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <br />

          <button type="submit">Acceder</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
