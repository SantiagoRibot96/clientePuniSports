import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UpdateProducts.css';

const UpdateProducts = () => {
  const [producto, setProducto] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [code, setCode] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const { pid } = useParams();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${pid}`).then(
        response => response.json()
    ).then(
        data => {
            setProducto(data.payload);
        }
    ).catch((error) => {
      console.log(error);
      setErrorMessage(error);
    });
  }, [pid]);

  const formHandler = async (e) => {
    e.preventDefault();

    const newProduct = {
      title: title === "" ? producto.title : title, 
      description: description === "" ? producto.description : description, 
      category: category === "" ? producto.category : category, 
      price: price === "" ? producto.price : parseInt(price), 
      thumbnail: thumbnail === "" ? producto.thumbnail : thumbnail, 
      code: code === "" ? producto.code : code, 
      stock: stock === "" ? producto.stock : parseInt(stock),
      status: status === "" ? producto.status : (status === "true" ? true : false)
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${pid}`, {
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
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  }

  return (
    <>
      <h2>Actualizar el producto <strong>{producto.title}</strong></h2>
      <p><strong>id:</strong> {pid}</p>

      <form onSubmit={formHandler}>
        <div className='container'>
          <label htmlFor="title"><strong>Nombre:</strong> {producto.title}</label>
          <input type="text" name='title' onChange={(e) => setTitle(e.target.value)} value={title}/>
        </div>
        <div className='container'>
          <label htmlFor="description"><strong>Descripcion:</strong> {producto.description}</label>
          <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description}/>
        </div>
        <div className='container'>
          <label htmlFor="category"><strong>Categoria:</strong> {producto.category}</label>
          <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} value={category}/>
        </div>
        <div className='container'>
          <label htmlFor="price"><strong>Precio:</strong> {producto.price}</label>
          <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} value={price}/>
        </div>
        <div className='container'>
          <label htmlFor="thumbnail"><strong>URL de la imagen:</strong> {producto.thumbnail}</label>
          <input type="text" name="thumbnail" onChange={(e) => setThumbnail(e.target.value)} value={thumbnail}/>
        </div>
        <div className='container'>
          <label htmlFor="code"><strong>Codigo:</strong> {producto.code}</label>
          <input type="text" name="code" onChange={(e) => setCode(e.target.value)} value={code}/>
        </div>
        <div className='container'>
          <label htmlFor="status"><strong>Status:</strong> {producto.status ? "True" : "False"}</label>
          <select name="status" onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value=""></option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className='container'>
          <label htmlFor="stock"><strong>Stock:</strong> {producto.stock}</label>
          <input type="text" name="stock" onChange={(e) => setStock(e.target.value)} value={stock}/>
          <button className="btn btn-primary" type="submit"> Actualizar Producto </button>
        </div>
      </form>
      {errorMessage ? <p className='error'>{errorMessage}</p> : <></>}
    </>
  )
}

export default UpdateProducts