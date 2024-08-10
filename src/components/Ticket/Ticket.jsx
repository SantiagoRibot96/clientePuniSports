import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Ticket = () => {
    const { cid } = useParams();
    const [payload, setPayload] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(``);
    const [flag, setFlag] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    let hasFetched = false

    const comprarProductos = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/${cid}/purchase`, {
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();
            
            if (!data.ok) {
                if(data.error){
                    throw new Error('Network response was not ok');
                }
            }

            setPayload(data.payload);
            setMessage(data.message);
            setFlag(data.flag);
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!hasFetched) {
            hasFetched = true;
            comprarProductos();
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <p>Gracias por su compra! Se ha enviado un mail a su casilla asociada</p>
            {payload.ticket ? (
                <>
                    <p>{message}</p>
                    <p>Total de la compra <strong>${payload.ticket.amount}.-</strong></p>
                </>
            ) : (
                <p>No se pudo generar el ticket. Por favor, inténtelo de nuevo más tarde.</p>
            )}
            <p>En caso de no recibir el mail contactese con el nuemro de ticket al <strong>11-2220-4493</strong></p>
            {errorMessage ? <p>{errorMessage}</p> : <></>}
        </>
    );
};

export default Ticket;