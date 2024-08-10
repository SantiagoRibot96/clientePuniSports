import { useContext, useState } from 'react'
import { SessionContext } from '../../context/SessionContext';
import { useNavigate, Link } from 'react-router-dom';
import Users from '../Users/Users';

const Profile = () => {
  const { isLoggedIn, user, updateSession } = useContext(SessionContext);
  const navigate = useNavigate();
  const [ errorMessage, setErrorMessage ] = useState("");

  const logout = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/logout`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'});
  
      const result = await response.json();
  
      if(result.ok) {
        console.log(result.message);
        updateSession(result.isLogged, "");
      }else{
        console.log(result.error);
        updateSession(result.isLogged, "");
        setErrorMessage(result.error);
      }
  
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  }
  
  return (
    <>
      {isLoggedIn ? 
        <div className='container'>
          <h2>Mi Perfil</h2>
          <p>Bienvenido!, {user.first_name} {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Edad: {user.age}</p>
          <p>Rol: <strong>{user.rol}</strong></p>
          {!errorMessage ? <button className="btn btn-primary" onClick={logout}>Cerrar sesion</button> : <p className='error'>{errorMessage}</p>}
          <Link to="/reset-password">Cambiar contraseña </Link>
        </div> :
        <div>
          <p>No te encuentras logeado</p>
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>}
        {user.rol === "admin" ? <Users/> : <><Link to="/uploadFiles" className="btn btn-secondary">Carga de Archivos</Link></>}
    </>
  )
}

export default Profile