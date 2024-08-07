import { useEffect, useState, useContext } from 'react'
import Item from '../Cards/Cards'
import './Products.css'
import { SessionContext } from '../../context/SessionContext';
import { Link } from 'react-router-dom';

const Products = (rol) => {
  const [backendData, setBackendData] = useState([]);
  const [firstPage, setFirstPage] = useState();
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNextPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [prevLink, setPrevLink] = useState();
  const [nextLink, setNextLink] = useState();
  const { user } = useContext(SessionContext);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.payload);
        setFirstPage(data.firstPage);
        setHasPrevPage(data.hasPrevPage);
        setHasNextPage(data.hasNextPage);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setPrevLink(data.prevLink);
        setNextLink(data.nextLink);
      }
    ).catch(error => console.log(error));
  }, []);

  const changeNextPage = async () => {
    await fetch(nextLink).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.payload);
        setFirstPage(data.firstPage);
        setHasPrevPage(data.hasPrevPage);
        setHasNextPage(data.hasNextPage);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setPrevLink(data.prevLink);
        setNextLink(data.nextLink);
      }
    ).catch(error => console.log(error));
  }

  const changePrevPage = () => {
    fetch(prevLink).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.payload);
        setFirstPage(data.firstPage);
        setHasPrevPage(data.hasPrevPage);
        setHasNextPage(data.hasNextPage);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setPrevLink(data.prevLink);
        setNextLink(data.nextLink);
      }
    ).catch(error => console.log(error));
  }

  return (
    <>
      <div className="contenedorProductos">
        {backendData.map((item) => (
          <Item key={item._id} {...item} rol={user.rol} misProductos={rol.rol}/>
        ))}
      </div>

      <div className='contenedor'>
        <div className='contenedor2'>
          {firstPage ? <button className='btn btn-secondary' disabled> Anterior </button> : <></>}
          {hasPrevPage ? <button className='btn btn-secondary' onClick={changePrevPage}> Anterior </button> : <></>}
          {hasNextPage ? <button className='btn btn-secondary' onClick={changeNextPage}> Siguiente </button> : <></>}
          {!hasNextPage ? <button className='btn btn-secondary' disabled> Siguiente </button> : <></>}
        </div>
        <p>Pagina {currentPage} de {totalPages}</p>
        {rol.rol ? <Link className='btn btn-primary' to="/newProduct">Cargar Producto</Link> : <></>}
      </div>
    </>
  )
}

export default Products