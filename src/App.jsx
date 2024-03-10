import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Error from "./pages/error/Error"
import NotFound from "./pages/error/NotFound"
import PrivateExample from "./pages/PrivateExample";

// components
import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private-page-example" element={<PrivateExample />} />

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
