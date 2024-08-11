import { useState, useEffect, useContext } from "react";
import { SessionContext } from '../../context/SessionContext';
import './Cart.css'
import { useNavigate, Link } from "react-router-dom";
import MPButton from "../MPButton/MPButton.jsx";

const Cart = () => {
    const [productos, setProductos] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState("");
    const { user } = useContext(SessionContext);
    const navigate = useNavigate();

    useEffect(() => {
      fetchProducts();
    }, [user.cart]);

    const fetchProducts = () => {
      fetch(`${process.env.REACT_APP_API_URL}/carts/${user.cart}`).then(
        response => response.json()
      ).then(
          data => {
            setProductos(data.payload);
          }
      ).catch((error) => {
        console.log(error)});
    }

    const quitarProducto = (pid) => {
      fetch(`${process.env.REACT_APP_API_URL}/carts/${user.cart}/product/${pid}`, {method: 'DELETE'}).then(
        response => response.json()
      ).then(
        data => {
          fetchProducts();
        }
      ).catch((error) => {
        console.log(error)
        setErrorMessage(error)});
    }

    return (
      <>
        <div className="contenedorProductos">
          {productos.map((element, index) => (
            <div key={index} className='cardProducto card'>
              <img src={element.product.thumbnail} alt={element.product.title} />
              <div className='card-body'>
                <h5 className='card-title'>{element.product.title}</h5>
                <p className='card-text'>Precio: ${element.product.price}.-</p>
                <p className='card-text'>Cantidad: {element.quantity}</p>
                <p className='card-text'><strong>Total: ${element.product.price * element.quantity}.-</strong></p>
                {!errorMessage ? <button className='btn btn-danger' onClick={() => quitarProducto(element.product._id)}>Quitar</button> : <p className="error">{errorMessage}</p>}
              </div>
            </div>
          ))}
        </div>

        {productos.length != 0 ? 
          <>
            <Link className="btn btn-primary" to={`/comprar/${user.cart}`}>Comprar</Link>
            <MPButton productos/>
          </> :
          <div>
            <p>No hay productos en el carrito, mira nuestras ofertas</p>
            <Link className="btn btn-primary" to="/">Ofertas</Link>
          </div>}
      </>
    )
}

export default Cart