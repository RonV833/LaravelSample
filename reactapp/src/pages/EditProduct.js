import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {

    const navigate = useNavigate();
    const [productInput, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value});
    };

    useEffect (()=>{
        const product_id = id;
        axios.get(`api/editproduct/${product_id}`).then(res => {
            if  (res.data.status === 200) {
                setProduct(res.data.product);
                setLoading(false);
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'Error');
                navigate('/products');
            }
        });
    }, [navigate, id]);

    const updateProduct = (e) => {
        e.preventDefault();
        //any changes to input 
        const data = {
            name: productInput.name,
            description: productInput.description,
            price: productInput.price,
            inStock: productInput.inStock
        }
        //any changes will be passed to axious
        axios.put(`api/updateproduct/${id}`, data).then(res => {
            if  (res.data.status === 200) {
                swal("Success", res.data.message);
                setError([]);
                // setProduct(res.data.product);
                // setLoading(false);
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'Error');
                navigate('/products');
            }
            else if (res.data.status === 422) {
                swal('All fields are mandatory', '');
                setError(res.data.validationError);
            }
        });
    };
    if (loading) {
        return <h4>Loading Edit Product Table</h4>
    }



    return (
        <div>
            <div className='container'>
                
                <div className="card">
                    <div className="card-header">
                        <h4>Edit Product
                            <Link to={"/products"} className='btn btn-sm float-end'>BACK</Link>
                        </h4>
                        
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateProduct}>
                            <div className='form-group mb-3'>
                                <label htmlFor="name">Product Name</label>
                                <input className='form-control' type="text" name='name' onChange={handleInput} value={productInput.name}/>
                                <span className='text-danger'>{errorInput.name}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="description">Product Description</label>
                                <input className='form-control' type="text" name='description' onChange={handleInput} value={productInput.description}/>
                                <span className='text-danger'>{errorInput.description}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="price">Product Price</label>
                                <input className='form-control' type="text" name='price' onChange={handleInput} value={productInput.price}/>
                                <span className='text-danger'>{errorInput.price}</span>   
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="inStock">Product In Stock</label>
                                <input className='form-control' type="text" name='inStock' onChange={handleInput} value={productInput.inStock}/>
                                <span className='text-danger'>{errorInput.inStock}</span>   
                            </div>

                            <button type='submit' className='btn btn-primary'>Update Product</button>
                            
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditProduct
