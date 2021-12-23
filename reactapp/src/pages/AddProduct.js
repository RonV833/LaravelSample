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
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value});
    };
    const saveProduct = (e) => {
        e.preventDefault();
        const data = {
            name: productInput.name,
            description: productInput.description,
            price: productInput.price,
            inStock: productInput.inStock,
        }
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
                history.push("/products") 
            }
            else if (res.data.status === 422) {
                setProduct({...productInput, error_list: res.data.validate_err})
            }
        })

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
                        <form onSubmit={saveProduct}>
                            <div className='form-group mb-3'>
                                <label for="name">Product Name</label>
                                <input className='form-control' type="text" name='name' onChange={handleInput} value={productInput.name}/>
                                <span className='text-danger'>{productInput.error_list.name}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label for="description">Product Description</label>
                                <input className='form-control' type="text" name='description' onChange={handleInput} value={productInput.description}/>
                                <span className='text-danger'>{productInput.error_list.description}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label for="price">Product Price</label>
                                <input className='form-control' type="text" name='price' onChange={handleInput} value={productInput.price}/>
                                <span className='text-danger'>{productInput.error_list.price}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label for="inStock">Product In Stock</label>
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
