import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/public-pages/HomePage"
import Login from "./pages/auth/Login"
import Contact from "./pages/public-pages/Contact"
import Signup from "./pages/auth/Signup"
import Private from "./components/auth/Private";
import UserProfile from "./pages/private/UserProfile";
import NotFound from "./pages/error/NotFound";
import MisReservas from "./pages/private/MisReservas";
import EditReservas from "./pages/private/EditReservas";

// components
import Navbar from "./components/Navbar"
import Hotel from "./pages/public-pages/Hotel"
import Reservas from "./pages/private/Reservas"


function App() {

  return (
    <div>
      <Navbar />

      <br />
    

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/misreservas" element={<Private ><MisReservas /></Private>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hotels" element={<Hotel/>}/>
        <Route path="/reservas/:hotelId" element={ <Private > <Reservas/> </Private> }/>
        <Route path="/editReservas/:hotelId" element={ <Private > <EditReservas/> </Private> }/>
        <Route path="/user-profile" element={<Private > <UserProfile/> </Private>}/>
       

        {/* error FE routes here... */}
        <Route path="/error" element={<Error/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App
