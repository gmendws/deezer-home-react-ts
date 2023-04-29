import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/layout/NavBar'
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Music from "./components/pages/Music";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/music" Component={Music} />
      </Routes>
    </Router>
  )
}

export default App
