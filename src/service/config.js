import axios from "axios"

const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// añade el token a todas las llamadas que se hagan con este servicio de axios
service.interceptors.request.use((config) => {
  //manera segura de pasar el token
  const storedToken = localStorage.getItem("authToken")

  if (storedToken) {
    config.headers.authorization = `Bearer ${storedToken}`
  }

  return config

})

export default service