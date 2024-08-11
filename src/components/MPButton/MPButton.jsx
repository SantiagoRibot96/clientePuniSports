import React, { useState } from 'react';

function MPButton({productos}) {
    const [loading, setLoading] = useState(false);
    console.log(productos);
    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/create_preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(products),
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

    return (
        <button className="btn btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Loading...' : 'Pagar con MercadoPago'}
        </button>
    );
}

export default MPButton;