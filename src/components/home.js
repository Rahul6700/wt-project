import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [inputCode, setInputCode] = useState(''); // User input for room code
    const [inputUserName, setUserName] = useState(''); // User input for username
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); // Hook for navigation

    const createParty = () => {
        const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const newRoomCode = generateRoomId();
        setLoading(true);
        setTimeout(() => {
            // Navigate to the new room with room code
            navigate(`/${newRoomCode}`);
        }, 2000); 
    };

    const handleCode = () => {
        if (inputCode) {
            setLoading(true);
            setTimeout(() => {
                // Navigate to the existing room with the input code
                navigate(`/${inputCode}`);
            }, 2000);
        } else {
            alert("Please enter a valid code.");
        }
    };
    return (
        <div className="bg-black text-white p-16 mx-auto max-w-3xl text-center rounded-xl shadow-md">
            <div className="bg-transparent text-white py-4 px-6 rounded-md text-xl mb-12">
                Welcome to "gamename"
                <textarea
                    className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 w-2/3 h-11 text-base transition-colors duration-300 focus:bg-gray-700 resize-none overflow-hidden mt-6"
                    placeholder="Enter Username"
                    value={inputUserName}  // Use inputUserName here
                    onChange={(e) => setUserName(e.target.value)} // Update username state
                    required
                ></textarea>
            </div>
            
            <hr className="border-t-3 border-gray-900 my-8 rounded-xl" />
            <button
                className="bg-gray-800 text-white py-4 px-6 rounded-md text-xl transition-transform duration-300 transform hover:scale-110 mt-5"
                onClick={createParty}
                disabled={loading}
            >
                Create Room
            </button>
            <div className="relative my-6">
                <h1 className="text-xl">OR</h1>
            </div>
            <div className="flex items-center justify-center gap-4">
                <textarea
                    className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 w-2/3 h-11 text-base transition-colors duration-300 focus:bg-gray-700 resize-none overflow-hidden"
                    placeholder="Enter code"
                    value={inputCode}  // Use inputCode for the room code
                    onChange={(e) => setInputCode(e.target.value)}  // Update code state
                    required
                ></textarea>
                <button
                    className="bg-gray-800 text-white py-2 px-6 rounded-md text-lg transition-transform duration-300 transform hover:scale-110"
                    onClick={handleCode}
                    disabled={loading}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}


