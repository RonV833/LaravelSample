import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const history = useNavigate();
    const [productInput, setProduct] = useState({
        name: "",
        description: "",
        price: 0.00,
        inStock: 0,
        error_list: [],
    });
    //called in onchange
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value});
    };
    //upon clicking submit button, called in onSubmit, assign values in properties
    const saveProduct = (e) => {
        e.preventDefault();
        const data = {
            name: productInput.name,
            description: productInput.description,
            price: productInput.price,
            inStock: productInput.inStock,
        }
        //to connect to backend
        axios.post(`api/addproduct`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setProduct({
                    name: "",
                    description: "",
                    price: 0.00,
                    inStock: 0,
                    error_list: [],
                });
                history("/products") //will redirect to product, just use history since useNavigate instead of history.push
            }
            else if (res.data.status === 422) {
                setProduct({...productInput, error_list: res.data.validate_err})
            }
        })

    };
    return (
        <div>
            <div className='container'>
                
                <div className="card">
                    <div className="card-header">
                        <h4>Add Product
                            <Link to={"/"} className='btn btn-sm float-end'>BACK</Link>
                        </h4>
                        
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveProduct}>
                            <div className='form-group mb-3'>
                                <label htmlFor="name">Product Name</label>
                                <input className='form-control' type="text" name='name' onChange={handleInput} value={productInput.name}/>
                                <span className='text-danger'>{productInput.error_list.name}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="description">Product Description</label>
                                <input className='form-control' type="text" name='description' onChange={handleInput} value={productInput.description}/>
                                <span className='text-danger'>{productInput.error_list.description}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="price">Product Price</label>
                                <input className='form-control' type="text" name='price' onChange={handleInput} value={productInput.price}/>
                                <span className='text-danger'>{productInput.error_list.price}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="inStock">Product In Stock</label>
                                <input className='form-control' type="text" name='inStock' onChange={handleInput} value={productInput.inStock}/>
                                <span className='text-danger'>{productInput.error_list.inStock}</span>   
                            </div>

                            <button type='submit' className='btn btn-primary'>Submit</button>
                            
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddProduct
