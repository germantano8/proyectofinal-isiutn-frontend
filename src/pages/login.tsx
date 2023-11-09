import Layout from '../app/layout';
import React, {SyntheticEvent, useState, useEffect} from 'react';
import style from './style.module.css'

export default function Login(){

    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');

    const submit = async(e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch('https://controlmaq.onrender.com/api/usuario/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre,
                password
            })
        });
    }

    return (
        <Layout>
            <div className="container-img">
                <img src="../app/logo.png" className="img-responsive"/>
            </div>
            <div className={style.title}>
                <h3>Iniciar sesion</h3>
            </div>
            <div className={style.subtitle}>
                <p>Lorem ipsum dolor sit amt ..... </p>
            </div>
            <div className={style.login}>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input className="form-control" placeholder="Enter email" required onChange={e => setNombre(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-danger">Sign in</button>
                </form>
            </div>
        </Layout>
    )
}