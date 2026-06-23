import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";
import Main from "../pages/Main.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Pagrindinis puslapis (Landing Page) */}
        <Route path="/" element={<Home />} />

        {/* Maršrutai prisijungimui ir registracijai */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/students" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App
