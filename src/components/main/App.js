import fondo from '../imagenes/fondo.jpg'; 
import MiLista from '../lista/MiLista';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import React, { useState, useEffect, createContext } from 'react';
import Form from './Form.js';
import { BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import Login from '../login/Login.js';
import './App.css';
import Menu from '../../Menu.js';
import GestionUsuarios from '../GestionUsuarios.js';

function App() {

    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    const USUARIO_API_URL = 'http://localhost:3004/users';
    const LOGIN_URL = 'http://localhost:3004/login';

    const [usuarios, setUsuarios] = useState([]);
    const [incidencias, setIncidencias] = useState([]);
    const [usuarioLogin, setUsuarioLogin] = useState(null);

    const inicioSesion = async (email, password) => {
        try {
            let respuesta = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ "email": email, "password": password })
            });
            if (respuesta.ok) {
                let data = await respuesta.json();
                setUsuarioLogin(data.user);
                localStorage.setItem("usuarioLogin", JSON.stringify(data.user));
            } else {
                alert("No se puede iniciar sesión");
            }
        } catch (e) {
            console.error("Error en el login:", e);
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioLogin");
        setUsuarioLogin(null);
    };

    useEffect(() => {
        let usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogin"));
        if (usuarioGuardado) {
            setUsuarioLogin(usuarioGuardado);
        }

        const obtenerIncidencias = async () => {
            try {
                let response = await fetch(INCIDENCIA_API_URL);
                if (!response.ok) throw new Error("HTTP Error");
                const data = await response.json();
                setIncidencias(data);
            } catch (e) {
                console.error("Error al cargar las incidencias:", e);
            }
        };

        const obtenerUsuarios = async () => {
            try {
                let response = await fetch(USUARIO_API_URL);
                if (!response.ok) throw new Error("HTTP Error");
                const data = await response.json();
                setUsuarios(data);
            } catch (e) {
                console.error("Error al cargar los usuarios:", e);
            }
        };

        obtenerIncidencias();
        obtenerUsuarios();

    }, []);

    const agregarincidencia = (
        titulo_nuevo,
        usuario_input,
        descripcion_nuevo,
        categoria_nuevo,
        nivel_urgencia_nuevo,
        ubicacion_nuevo
    ) => {

        const fecha = new Date();
        const fecha_formateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

        let usuarioCompleto = usuarios.find(u => 
            u.email && u.email.toLowerCase() === (usuario_input.email ? usuario_input.email.toLowerCase().trim() : '')
        );

        const nueva_incidencia = {
            id: incidencias.length + 1,
            usuario: usuarioCompleto || usuarioLogin, 
            titulo: titulo_nuevo,
            descripcion: descripcion_nuevo,
            categoria: categoria_nuevo,
            nivel_urgencia: nivel_urgencia_nuevo,
            ubicacion: ubicacion_nuevo,
            fecha_registro: fecha_formateada,
            estado: "Abierto"
        };

        setIncidencias([...incidencias, nueva_incidencia]);
    };

    return (
        <div className='card' style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <Header />
            
            {usuarioLogin === null ? (
                <Login inicioSesion={inicioSesion} />
            ) : (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-7">

                        <button className="btn btn-danger btn-sm mt-2" onClick={() => {
                            localStorage.removeItem("usuarioLogin");
                            setUsuarioLogin(null);
                        }}>Cerrar sesión</button>
                    </div>
                    

                </div>

            <Routes>
                <Route path="/" element={<p>Pantalla de inicio</p>} />
                <Route path="/Verincidencias" element={< MiLista incidencias ={incidencias}/>} />
                <Route path="/Registrarincidencias" element={<Form agregarincidencia={agregarincidencia}/>} />
                <Route path="/Gestionusuarios" element={<GestionUsuarios usuarios={usuarios} />} />
            </Routes>
                <Menu usuarioLogin={usuarioLogin}></Menu>
            </div>
        )}

            <Footer />
        </div>
    );
}

export default App;

