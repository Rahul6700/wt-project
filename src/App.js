import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Party from "./pages/party";
export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<div id="home"><Home /></div>} />
        <Route path="/:roomCode" element={<Party />} /> 
      </Routes>
    </Router>
  );
}

