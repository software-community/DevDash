import React from 'react';
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Model(props) {
    const { scene } = useGLTF("2.glb"); // Ensure the path is correct
    return <primitive object={scene} scale={0.015} {...props} />;
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controlSettings, setControlSettings] = useState({
        speed: 3.0,
        damping: 0.1,
    });

    const [name, setName] = useState("");
    const [entryNumber, setEntryNumber] = useState("");

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                setControlSettings({
                    speed: 6.0, // Increase speed for mobile
                    damping: 0.2, // Increase damping for mobile
                });
            } else {
                setControlSettings({
                    speed: 3.0, // Default speed for desktop
                    damping: 0.1, // Default damping for desktop
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();
    
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based, so add 1
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
    
        // Create an object to hold the form data
        const formData = {
            name: name,
            entryNumber: entryNumber,
            date: currentDate,
            time: 0 // You can add other fields as needed
        };
    
        // Send the form data as a JSON string
        let result = await fetch('http://localhost:3000/', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        // Handle the response
        result = await result.json(); // Correct the variable name to `result`

    
        console.log("Name:", name);
        console.log("Entry Number:", entryNumber);
    
        navigate(`/Level-1(1)?entryNumber=${entryNumber}`);
    };

    return (
        <div className="absolute w-full h-full bg-black text-white flex flex-col justify-center items-center">
            <header className="w-full mt-3 p-4 fixed top-0 z-10">
                <h1 className="text-center text-gray-900 dark:text-white text-4xl sm:text-6xl lg:text-4xl">SoftCom - DevDash</h1>
            </header>
            <div className="w-full h-3/5 relative mt-16 mb-5">
                <Canvas dpr={[3, 6]} shadows camera={{ fov: 45 }} className="w-full h-full">
                    <color attach="background" args={["#000000"]} />
                    <OrbitControls
                        enableZoom={false}
                        minPolarAngle={Math.PI / 4} // Minimum polar angle
                        maxPolarAngle={Math.PI / 2} // Maximum polar angle
                        autoRotate // Enable auto-rotation
                        autoRotateSpeed={1.0} // Adjust the speed of auto-rotation
                    />
                    <Stage environment={null}>
                        <Model scale={0.015} />
                    </Stage>
                </Canvas>
            </div>
            <form onSubmit={handleSubmit} className="max-w-sm w-3/4 px-4">
                <div className="mb-4">
                    <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                        type="text"
                        id="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="entryNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entry Number</label>
                    <input
                        type="text"
                        id="entryNumber"
                        value={entryNumber}
                        onChange={(e) => setEntryNumber(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mb-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}



export default Login;