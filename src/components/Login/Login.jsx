import { useState, useContext } from 'react'
import { SessionContext } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({email: '', password: ''});
  const { updateSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'});

        const result = await response.json();

        if(result.ok) {
          console.log(result.message);
          updateSession(result.isLogged, result.payload);
        }else{
          console.log(result.error);
          updateSession(result.isLogged, "");
        }
    } catch (error) {
      console.log("nok");
    }

    navigate('/');
  }

  const github = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/github`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'});
        
        const result = await response.json();

        console.log(result);
        
    } catch (error) {
      console.log("nok");
    }
  }

  return (
    <>
      <h2>Inicie sesion </h2>

      <form onSubmit={formHandler}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' value={formData.password} onChange={handleChange} required />
        <button className='btn btn-primary' type='submit'>Iniciar </button>
        <a href="/reset-password" type='submit'>Olvidaste tu contraseña? </a>
      </form>

      <a className='btn btn-primary' href="/registrarse">Registrarse! </a>
      <a className='btn btn-secondary' onClick={github}>Ingresa con Github</a>
    </>
  )
}

export default Login