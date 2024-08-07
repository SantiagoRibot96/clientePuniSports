import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';

function Register() {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ edad, setEdad ] = useState();

  const navigate = useNavigate();
  const { updateSession } = useContext(SessionContext);

  const formHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      age: edad,
      password,
      email
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser),
      credentials: 'include'
    });

    const result = await response.json();

    if(result.ok){
      console.log(result.message);
      updateSession(result.isLogged, result.payload);
      navigate("/");
    }else{
      console.log(result.error);
      updateSession(result.isLogged, "");
    }
  }
  return (
    <>
      <h2>Registrate</h2>
      <form onSubmit={formHandler}>
        <div className='container'>
          <label htmlFor="first_name">Nombre: </label>
          <input type="text" name='first_name' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
        </div>
        <div className='container'>
          <label htmlFor="last_name">Apellido: </label>
          <input type="text" name='last_name' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
        </div>
        <div className='container'>
          <label htmlFor="email">Email: </label>
          <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div className='container'>
          <label htmlFor="password">Password: </label>
          <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <div className='container'>
          <label htmlFor="edad">Edad: </label>
          <input type="text" name='edad' onChange={(e) => setEdad(e.target.value)} value={edad}/>
          <button className="btn btn-primary" type="submit"> Registrarse </button>
        </div>
      </form>
    </>
  )
}

export default Register