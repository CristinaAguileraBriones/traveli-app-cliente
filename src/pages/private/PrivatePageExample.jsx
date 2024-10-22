import { useEffect, useState } from 'react'
import service from '../../service/config'

function PrivatePageExample() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      // const response = await service.get("/auth/user/loquesea")
      //servicio de axios : identificamos una parte de la url
      // aqui ponemos las rutas privadas, las que solamente puede ver el usuario, en nuestro caso la lista de favoritos
    // tenemos que hacer el localStorage con el authToken, la llamada axios con get y la ruta y añadir un headers con la info del token
    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder y ver la siguiente información:</p>

    </div>
  )
}

export default PrivatePageExample