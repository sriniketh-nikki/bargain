import React ,{useState,useEffect}from 'react';
import MyNavbar from '../navbar';
import Menu from '../menu';
import Filterdisplaynav from '../filterdisplaynav';
import { Link } from 'react-router-dom';
import Product from "../Product";
import axios from "axios";
import Pagination from "../pagination";

// import Filter from '../ki/filter';

const Booksallcollection = () => {
    const  [products, setProducts] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [viewRowIndex, setViewRowIndex] = useState(null);
    useEffect(() => {
      axios
        .get("http://localhost:8080/books")
        .then((res) => {
          if(res.data !== "Fail" && res.data !== "Error"){
            setProducts(res.data);
          }
        })
        .catch((err) => console.log(err));
    },[]);
    useEffect(() => {
      setCurrentPage(1);
      setViewRowIndex(null);
    }, [pageSize]);
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tableData = products.slice(startIndex, endIndex);
    return (
        <>
           <MyNavbar/>

<nav className="p-2 ps-lg-5 pe-lg-5">
            <Link to="/" className="text-decoration-none text-dark">
                <i className="bi bi-house-fill"></i>
            </Link>
            &nbsp; / Books
</nav>
        <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5 mb-5">
        <div className="col-lg-2 col-xs-12 col-md-12">
            <Menu/>
        </div>

        <div className="col-xs-12 col-md-12 col-lg-10 ps-3">
        <Filterdisplaynav pageSize={pageSize} setPageSize={setPageSize} />

            <div className="d-flex flex-wrap gap-2">
            {tableData.map((product,index) => (
              <Product product={product} key={index} rendercomp='boykids'/>
            ))}
          </div>
          <Pagination
            stateData={products}
            pageSize={pageSize}
            setViewRowIndex={setViewRowIndex}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        </div>  
        </>
    );
};

export default Booksallcollection;