import React from 'react'
import { useEffect, useState } from 'react'
import "./Users.css"

const Users = () => {
    const [ payload, setPayload ] = useState([]);
    const [ roles, setRoles ] = useState({});
    const [ messages, setMessages ] = useState({});

    let flag = false;

    const fetchUsers = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'});

            const result = await response.json();

            if(result.ok){
                console.log(result.payload);
                setPayload(result.payload);
                flag = true;
            }else{
                console.log(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const changeRol = (id, newRol) => {
        setRoles(prevRoles => ({
            ...prevRoles,
            [id]: newRol
        }));
    };

    const handleFormSubmit = async (e, id, email) => {
        e.preventDefault();
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${roles[id]}/${email}`);
    
        const result = await response.json();
    
        if(result.ok) {
            console.log(result.message);
            console.log('Rol actualizado para usuario', id, 'a', roles[id]);
            fetchUsers();
        }else{
            console.log(result.error);
        }
    };

    const resetPassword = async (e, email, id) => {
        e.preventDefault();
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/requestPasswordReset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email})});
    
        const result = await response.json();
    
        if(result.ok) {
            setMessages(prevRoles => ({
                ...prevRoles,
                [id]: result.message
            }));
            console.log(result.message);
        }else{
            console.log(result.error);
        }
    }

    const deleteAccount = async (e, email, id) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email})});
    
        const result = await response.json();
    
        if(result.ok) {
            setMessages(prevRoles => ({
                ...prevRoles,
                [id]: result.message
            }));
            console.log(result.message);
        }else{
            console.log(result.error);
        }
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Ultima Conexion</th>
                    <th>Premium</th>
                    <th>Cambiar Rol</th>
                    <th>Blanquear contarseña</th>
                    <th>Eliminar Cuenta</th>
                </tr>
            </thead>
            <tbody>
                {payload.map((item) => (
                    <tr key={item._id}>
                        <th>{item.first_name}</th>
                        <th>{item.email}</th>
                        <th>{item.rol}</th>
                        <th>{item.last_connection}</th>
                        <th>{(item.documentOk) ? "OK" : "Faltan documentos"}</th>
                        <th>
                            <form onSubmit={(e) => handleFormSubmit(e, item._id, item.email)}>
                                <select name="rol" defaultValue="role" onChange={(e) => changeRol(item._id, e.target.value)} value={roles[item._id]}>
                                    <option value="role" disabled="disabled"></option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    {item.documentOk ? <option value="premium">Premium</option> : <></>}
                                </select>
                                <button type='submit'>OK</button>
                            </form>
                        </th>
                        <th>{messages[item._id] ===  undefined ? <button onClick={(e) => resetPassword(e, item.email, item._id)}>Send Mail</button> : <p>{messages[item._id]}</p>}</th>
                        <th>{(item.rol != "admin" && messages[item._id] != "Usuario borrado") ? <button onClick={(e) => deleteAccount(e, item.email, item._id)}>Delete</button> : <p>Contactar master DB</p>}</th>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Users