import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/layout/NavBar'
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <NavBar />
      <Home />
    </Router>
  )
}

export default App
