import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../context/SessionContext";
import './Count.css';
import { useNavigate } from "react-router-dom";

const Count = ({stock, pid, status}) => {
    const [contador, setContador] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const { user, isLoggedIn } = useContext(SessionContext);
    const navigate = useNavigate();

    const sumarContador = () => {
        if(contador < stock - quantity) {
            setContador(contador + 1);
        }
    }

    const restarContador = () => {
        if(contador > 1) {
            setContador(contador - 1);
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/carts/${user.cart}`).then(
            response => response.json()
        ).then(
            data => {
                const producto = data.payload.find(item => item.product._id === pid);
                producto ? setQuantity(producto.quantity) : setQuantity(0);
                console.log(producto);
            }
        ).catch(error => console.log(error));
    }, [pid]);

    const comprarHandler = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/carts/${user.cart}/product/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({quantity: contador})
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data.payload);
                navigate("/");
            }
        ).catch(error => console.log(error));
    }

  return (
    <>
        <div className="container-flex">
            <div className="centrar">
                <button onClick={restarContador} className="btn btn-outline-primary"> - </button>
                <p className="cont"> {contador} </p>
                <button onClick={sumarContador} className="btn btn-outline-primary"> + </button>
            </div>
            {(stock - quantity > 0 && status && isLoggedIn) ? (<button className='btn btn-primary' onClick={comprarHandler}> Comprar </button>) : (<button className='btn btn-outline-secondary' disabled> Comprar </button>)}
        </div>
    </>
  )
}

export default Count