
import { createContext, useState, useEffect } from "react"
import service from "../service/config"
// componente contexto

const AuthContext = createContext()

// componente envoltorio

function AuthWrapper(props){

  const [isLoggedIn, setIsLoggedId ] = useState(false)
  const [user, setUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  useEffect(()=>{
    // esto es para verificar si el usuario esta verificado o no al ir a la web
    authenticateUser()

  }, [])


  const authenticateUser = async () => {
    // esta es una funcion que llamará a la ruta verify y nos actualiza los estados y se llamará luego de hacer login/logout o al volver a app.
    
    try {

      // const authToken = localStorage.getItem("authToken")

      // const response = await axios.get("http://localhost:3000/api/auth/verify", {
      //   headers: {authorization: `Bearer ${authToken}`}
      // })

     const response = await service.get("/auth/verify")
     console.log(response.data);
     

    
      // en este punto el token es valido.
      setIsLoggedId(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false)
      
      
    } catch (error) {
      // no es valido o no existe.
      console.log(error)
      setIsLoggedId(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    user,
    setUser,
    authenticateUser
  }

  if(isValidatingToken){//buscar spinner
    return <h3>... validando usuario</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>

  )

}

export {
  AuthContext,
  AuthWrapper
}