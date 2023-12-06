import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import css
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Login = () => {
    return (
        <main style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/">
                <img className="logo_main" src="imagenes/home_page/logoMarvel.png" alt="Marvel Logo" />
            </Link>
            <div className="container margen">
                <div className="contenedorCard" id="columnas_personajes" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="card neon rounded cardPersonal border border-danger mb-3" style={{ width: '75%', height: '100%' }}>
                        <div className="card-body">
                            <h2 className="card-subtitle center" style={{ marginBottom: '0.5em', fontSize: '2em', textAlign: 'center' }}>
                                INGRESA PARA ACCEDER A TODO EL CONTENIDO
                            </h2>
                            <h4 className="card-subtitle center">
                                No tienes cuenta?<Link className="inicia_sesion" to="/register">Registrate</Link>
                            </h4><br />
                            <form className="custom-form" action="" method="post" role="form">
                                <div className="form-group">
                                    <label className="card-subtitle" htmlFor="email">Correo electronico</label>
                                    <input className="form-control" id="email" type="text" placeholder="Correo electrónico" name="email" />
                                </div>
                                <div className="espacio"></div>
                                <div className="form-group">
                                    <label className="card-subtitle" htmlFor="password">Contrasena</label>
                                    <input className="form-control" id="password" type="password" placeholder="Contraseña" name="password" />
                                </div>
                                <div className="espacio"></div>
                                <div className="form-group text-center">
                                    <button className="btn btn-outline-white btn-danger" type="submit" style={{ width: '80%' }}>
                                        Inicia Sesion
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}