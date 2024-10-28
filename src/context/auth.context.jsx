
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
    
    authenticateUser()

  }, [])


  const authenticateUser = async () => {
    
    
    try {

     

     const response = await service.get("/auth/verify")
     console.log(response.data);
     

    
      setIsLoggedId(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false)
      
      
    } catch (error) {
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