import { useContext, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";

function Login() {

  const navigate = useNavigate()
  const {authenticateUser} =useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault()
      
  
    try {

      const userCredentials = {
        email,
        password
      }
      
    const response =  await service.post("/auth/login", userCredentials)
    console.log(response)

    localStorage.setItem("authToken", response.data.authToken)

    await authenticateUser()
    navigate("/private-page-example")



    } catch (error) {
      if(error.response.status === 400){

        setErrorMessage(error.response.data.message) 
      }else {
       //pagina de error
      }
  }}

  return (
    <div>

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
  );
}

export default Login;
