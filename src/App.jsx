import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/auth/HomePage"
import Login from "./pages/auth/Login"
import Contact from "./pages/auth/Contact"
import Signup from "./pages/auth/Signup"
import PrivatePageExample from "./pages/private/PrivatePageExample";
import Private from "./components/auth/Private";

// components
import Navbar from "./components/Navbar"
import Hotel from "./pages/auth/Hotel";


function App() {

  return (
    <div>
      <Navbar />

      <br />
    

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hotels" element={<Hotel/>}/>
        <Route path="/private-page-example" element={<Private ><PrivatePageExample/> </Private>} />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
