import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [inputCode, setInputCode] = useState(''); // User input state
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); // Hook for navigation

    const createParty = () => {
        const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const newRoomCode = generateRoomId();
        setLoading(true);
        setTimeout(() => {
            navigate(`/${newRoomCode}`);
        }, 2000); 
    };

    const handleCode = () => {
        if (inputCode) {
            setLoading(true);
            setTimeout(() => {
                navigate(`/${inputCode}`);
            }, 2000);
        } else {
            alert("Please enter a valid code.");
        }
    };

    return (
        <div id="container">
            <button id="btn-create-party" onClick={createParty} disabled={loading}>
                Create Room
            </button>

            <div id="or-container">
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <h1 style={{ margin: "20px 0" }}>OR</h1>
                )}
            </div>

            <div id="flex-container">
                <textarea
                    id="textarea-input"
                    placeholder="Enter code"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    required
                ></textarea>
                <button id="btn-submit" onClick={handleCode} disabled={loading}>
                    Submit
                </button>
            </div>
        </div>
    );
}

