import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import service from "../../service/config";



function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlenameChange = (e) => setname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        name,
        password
      }
      //con service nos ahorramos la url
      await service.post("/auth/signup", newUser)
      navigate("/login")
    } catch (error) {
      console.log(error);
      if(error.response.status === 400){

        setErrorMessage(error.response.data.message)

      }else {
             
        //! aqui colocamos la pag de error.
      }    
    }
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handlenameChange}
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

        <button type="submit">Registrar</button>
        {errorMessage && <p>{errorMessage}</p>}
        
      </form>
      
    </div>
  );
}

export default Signup;
