import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        axios.get(`api/products`).then(res=> {
            if(res['status']===200) {
                setProducts(res.data.products);
                setLoading(false);
            }
        })
    }, []); 
    if (loading) {
        return <h4>Loading Product Data</h4>
    }
    else {
        var product_HTMLTABLE="";
        product_HTMLTABLE = products.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.inStock}</td>
                <td><Link to={`editproduct/${item.id}`} className='btn btn-success btn-sm'>EDIT</Link></td>
                <td ><button>DELETE</button></td>

            </tr>)
        });
    };
    return (
        <div>
            <div className='container'>
                
                <div class="card">
                    <div class="card-header">
                        <h4>Add Product
                            <Link to={"/"} className='btn btn-sm float-end'>BACK</Link>
                        </h4>
                        
                    </div>
                    <div class="card-body">
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>In Stock</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewProduct
