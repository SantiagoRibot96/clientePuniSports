import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

function MPButton() {
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    const { user } = useContext(SessionContext);
    
    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/create_preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productos),
                credentials: 'include'
            });

            const data = await response.json();
            window.location.href = data.init_point;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <button className="btn btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Loading...' : 'Pagar con MercadoPago'}
        </button>
    );
}

export default MPButton;