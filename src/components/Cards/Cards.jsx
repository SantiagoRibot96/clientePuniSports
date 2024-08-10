import { Link, useNavigate } from "react-router-dom";
import './Cards.css';
import { SessionContext } from '../../context/SessionContext';
import { useContext, useState } from 'react';

const Item = ({owner, thumbnail, title, price, stock, _id, description, status, rol, misProductos}) => {

  const navigate = useNavigate();
  const { user } = useContext(SessionContext);
  const { errorMessage, setErrorMessage } = useState("");
  
  const eliminarProducto = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${_id}`, {method: 'DELETE'}).then(
      response => response.json()
    ).then(
      data => console.log(data)
    ).catch((error) => {
      console.log(error);
      setErrorMessage(error);
    });

    navigate("/");
  }

  const actualizarProducto = () => {
    navigate(`/updateProducts/${_id}`);
  }

  if(misProductos){
    if(owner === user._id || rol === "admin"){
      return(
        <div className='cardProducto card'>
          <img src={thumbnail} alt={title} />
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
            <p className='card-text'>${price}.-</p>
            <p className='card-text'>Owner: <strong>{owner}</strong></p>
            {status ? (<p className='card-text'>Stock: <strong>{stock}</strong></p>) : (<p className='card-text'>Sin Stock</p>)}
            <>
              {!errorMessage ?
              <form onSubmit={eliminarProducto}>
                <button type='submit' className='btn btn-danger'>Eliminar</button>
              </form> :
              <p className="error">{errorMessage}</p>}

              <form onSubmit={actualizarProducto}>
                <button type='submit' className='btn btn-primary'>Actualizar</button>
              </form>
            </>
          </div>
        </div>
      )
    }else if(rol != "admin"){
      return(
        <div className='cardProducto card cardOculta'>
          <img src={thumbnail} alt={title} />
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
            <p className='card-text'>${price}.-</p>
            <p className='card-text'>Owner: {owner}</p>
            {status ? (<p className='card-text'>Stock: <strong>{stock}</strong></p>) : (<p className='card-text'>Sin Stock</p>)}
            <>
              {!errorMessage ?
              <form onSubmit={eliminarProducto}>
                <button type='submit' className='btn btn-danger'>Eliminar</button>
              </form> :
              <p className="error">{errorMessage}</p>}
              
              <form onSubmit={actualizarProducto}>
                <button type='submit' className='btn btn-primary' disabled>Actualizar</button>
              </form>
            </>
          </div>
        </div>
      )
    }
  }else{
    return(
      <div className='cardProducto card'>
        <img src={thumbnail} alt={title} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>${price}.-</p>
          {status ? (<p className='card-text'>Stock: <strong>{stock}</strong></p>) : (<p className='card-text'>Sin Stock</p>)}
          <Link className="btn btn-primary" to={`/product/${_id}`}>Ver Detalles</Link>
        </div>
      </div>
    );
  }
}

export default Item