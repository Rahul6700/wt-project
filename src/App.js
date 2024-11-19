import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Party from "./pages/party";
export default function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Navbar username={username}/>
      <Routes>
        <Route path="/" element={<div id="home"><Home setUsername={setUsername}/></div>} />
        <Route path="/:roomCode" element={<Party />} /> 
      </Routes>
    </Router>
  );
}

