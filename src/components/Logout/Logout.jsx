import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { updateSession } = useContext(SessionContext);
  const navigate = useNavigate();

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
      }
  
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <><button className="btn btn-primary" onClick={logout}>Salir</button></>
  )
}

export default Logout