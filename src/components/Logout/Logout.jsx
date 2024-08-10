import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { updateSession } = useContext(SessionContext);
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
        navigate('/');
      }else{
        console.log(result.error);
        updateSession(result.isLogged, "");
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  }
  return (
    <>
      {!errorMessage ? <button className="btn btn-primary" onClick={logout}>Salir</button> : <p className="error">{errorMessage}</p>}
    </>
  )
}

export default Logout