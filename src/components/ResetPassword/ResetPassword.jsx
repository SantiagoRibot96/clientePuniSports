import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const { mail } = useParams();
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/requestPasswordReset`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({email})});

      const result = await response.json();

      if(result.ok) {
        console.log(result.message);
        navigate("/");
      }else{
        console.log(result.error);
      }
  }

  const changePassword = async (e) => {
    e.preventDefault();

    const sent = {
      token,
      email: mail, 
      password
    }

    const response = await  fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(sent)});

      const result = await response.json();

      if(result.ok) {
        console.log(result.message);
      }else{
        console.log(result.error);
      }
  }
  return (
    <>
      {mail === undefined ?
      <form onSubmit={resetPassword}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        <button className='btn btn-primary' type='submit'>Recuperar</button>
      </form> : 
      <div>
        <h2>Restablecimiento de contraseña</h2>
        <form onSubmit={changePassword}>
          <label htmlFor="token">Token de confirmacion: </label>
          <input type="text" name="token" onChange={(e) => setToken(e.target.value)} value={token} required />
          <label htmlFor="password">Nueva Contraseña: </label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          <button className='btn btn-primary' type='submit'>Cambiar</button>
        </form>  
      </div>}
    </>
  )
}

export default ResetPassword