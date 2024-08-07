import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewProduct.css';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

const newProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [code, setCode] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useContext(SessionContext);
  
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();

    const newProduct = {
      title: title, 
      description: description, 
      category: category, 
      price: parseInt(price), 
      thumbnail: thumbnail, 
      code: code, 
      stock: parseInt(stock),
      status: status === "true" ? true : false,
      owner: user.rol === "admin" ? "admin" : user._id
    }

    console.log(newProduct);
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct),
      credentials: 'include'
    });

    const result = await response.json();

    if(result.ok){
      console.log(result.message);
      navigate("/");
    }else{
      console.log(result.error);
    }
  }

  return (
    <>
      <h2>Nuevo producto</h2>

      <form onSubmit={formHandler}>
        <div className='container'>
          <label htmlFor="title"><strong>Nombre:</strong></label>
          <input type="text" name='title' onChange={(e) => setTitle(e.target.value)} value={title} required/>
        </div>
        <div className='container'>
          <label htmlFor="description"><strong>Descripcion:</strong></label>
          <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description} required/>
        </div>
        <div className='container'>
          <label htmlFor="category"><strong>Categoria:</strong></label>
          <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} value={category} required/>
        </div>
        <div className='container'>
          <label htmlFor="price"><strong>Precio:</strong></label>
          <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} value={price} required/>
        </div>
        <div className='container'>
          <label htmlFor="thumbnail"><strong>URL de la imagen:</strong></label>
          <input type="text" name="thumbnail" onChange={(e) => setThumbnail(e.target.value)} value={thumbnail} required/>
        </div>
        <div className='container'>
          <label htmlFor="code"><strong>Codigo:</strong></label>
          <input type="text" name="code" onChange={(e) => setCode(e.target.value)} value={code} required/>
        </div>
        <div className='container'>
          <label htmlFor="status"><strong>Status:</strong></label>
          <select name="status" onChange={(e) => setStatus(e.target.value)} value={status} required>
            <option value=""></option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className='container'>
          <label htmlFor="stock"><strong>Stock:</strong></label>
          <input type="text" name="stock" onChange={(e) => setStock(e.target.value)} value={stock} required/>
          <button className="btn btn-primary" type="submit"> Cargar </button>
        </div>
      </form>
    </>
  )
}

export default newProduct