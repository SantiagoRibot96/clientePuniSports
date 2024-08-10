import React, { useState } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadFiles = () => {
    const [file0, setFile0] = useState(null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState("");
    const { user } = useContext(SessionContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('document', file1);
        formData.append('product', file0);
        formData.append('profile', file2);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.email}/documents`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            
            const result = await response.json();

            if (result.ok) {
                console.log(result.message);
                navigate("/")
            } else {
                console.error('Error en la respuesta del servidor:', result.message);
                setErrorMessage(result.message);
            }
            
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            setErrorMessage(error);
        }
    };
    
    return (
        <>
        {user.documentOk ? <p>Documentacion ya cargada</p> : 
            <div className='container'>
                <form className="container" onSubmit={handleSubmit}>
                    <label htmlFor="file0">Constancia Monotributo: </label>
                    <input type="file" onChange={(e) => setFile0(e.target.files[0])} required/>
                    <label htmlFor="file1">Frente del DNI: </label>
                    <input type="file" onChange={(e) => setFile1(e.target.files[0])} required/>
                    <label htmlFor="file2">Dorso del DNI: </label>
                    <input type="file" onChange={(e) => setFile2(e.target.files[0])} required/>
                    <button className="btn btn-primary" type="submit">Subir Archivo</button>
                </form>
            </div>
        }
        {errorMessage ? <p className='error'> {errorMessage} </p> : <></>}
        </>
    );
};

export default UploadFiles;