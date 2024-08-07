import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Count from "../Count/Count";
import './ProductsDetail.css';

const ProductsDetail = () => {
    const [producto, setProducto] = useState({});
    const { pid } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${pid}`).then(
            response => response.json()
        ).then(
            data => {
                setProducto(data.payload);
            }
        ).catch(error => console.log(error));
    }, [pid]);

    return (
        <div className='container'>
            <h2>{producto.title} </h2>
            <h3>Precio: ${producto.price}.- </h3>
            <img src={producto.thumbnail} alt={producto.title} />
            <p>{producto.description}</p>
            {(producto.stock <= 0 || !producto.status) ? <p>Sin stock</p> : <p>stock: {producto.stock}</p>}
            <div className='container agregarCarrito'>
                <Link className='btn btn-secondary' to="/"> Volver </Link>
                <Count stock = {producto.stock} pid = {producto._id} status = {producto.status}/>
            </div>
        </div>
    );
}

export default ProductsDetail