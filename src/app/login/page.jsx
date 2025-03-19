'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Correo electrónico:", email);
        console.log("Contraseña:", password);
    };

    return (
        <div className="z-20 bg-white h-screen w-screen fixed flex justify-center items-center flex-col">
            <div className="p-8 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-center">
                <Image src="/icons.png" alt="Login" width={300} height={300} className="mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        className="mt-4 p-2 w-full border rounded-lg focus:outline-none" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className="mt-4 p-2 w-full border rounded-lg focus:outline-none" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                        Iniciar sesión
                    </button>
                </form>
            </div>
            <div className="mt-4 text-gray-500 text-sm">
                <Link href="/" className="underline">Regresa al Inicio</Link>
            </div>
        </div>
    );
};

export default Login;
