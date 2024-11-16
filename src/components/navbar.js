import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({btn1text,btn2text}) {
    const navigate = useNavigate(); 
    const goToHome = () => {
        navigate('/');    
    };
    return (
        <div id="navbar">
            <h1 onClick={goToHome} style={{ cursor: 'pointer' }}>GuessLoc</h1>
            <button id="btn1">{btn1text}</button>
            <button id="btn2">{btn2text}</button>
        </div>
    );
}

