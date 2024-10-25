import { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cart_cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchInfo(); // Call fetchInfo directly on mount
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      fetchInfo(); // Refresh the product list after removal
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-header">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Rating</p>
        <p>AGR</p>
        <p>APPS</p>
        <p>GA/TW/SV</p>
        <p>Value</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-item">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.rating}</p>
            <p>{product.AGR}</p>
            <p>{product.APPS}</p>
            <p>{product.GA_TW_SV}</p>
            <p>{product.value}</p>
            <p>{product.category}</p>
            <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="Remove" />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;

