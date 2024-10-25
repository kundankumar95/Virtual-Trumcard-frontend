import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_image.png';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "cards",
    price: "",
    rating: "",
    AGR: "",
    APPS: "",
    GA_TW_SV: "GA",
    value: "",
  });

  // Handle file input for the image
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle text inputs
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Submit product and image
  const Add_Product = async () => {
    try {
      // Basic validation
      const { name, price, rating, AGR, APPS, value } = productDetails;
      if (!name || !price || !rating || !AGR || !APPS || !value) {
        alert('Please fill out all fields.');
        return;
      }
      if (!image) {
        alert('Please upload an image.');
        return;
      }

      // Prepare image for upload
      let formData = new FormData();
      formData.append('image', image);
      formData.append('name', productDetails.name);
      formData.append('category', productDetails.category);
      formData.append('rating', productDetails.rating);
      formData.append('price', productDetails.price);
      formData.append('AGR', productDetails.AGR);
      formData.append('APPS', productDetails.APPS);
      formData.append('GA_TW_SV', productDetails.GA_TW_SV);
      formData.append('value', productDetails.value);

      // Upload image
      let response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Image upload failed');
      }

      // If image upload is successful, proceed to add the product
      if (responseData.success) {
        response = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...productDetails,
            image: responseData.image_url
          }),
        });

        responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to add product');
        }

        alert(responseData.success ? 'Card Added' : 'Failed to add product');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Check console for details.');
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Card title</p>
        <input 
          value={productDetails.name} 
          onChange={changeHandler} 
          type="text" 
          name='name' 
          placeholder='Type Here' 
          required
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input 
            value={productDetails.price} 
            onChange={changeHandler} 
            type="text" 
            name="price" 
            placeholder='Type Here' 
            required
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Rating</p>
          <input 
            value={productDetails.rating} 
            onChange={changeHandler} 
            type="text" 
            name="rating" 
            placeholder='Type Here' 
            required
          />
        </div>
        <div className="addproduct-itemfield">
          <p>AGR</p>
          <input 
            value={productDetails.AGR} 
            onChange={changeHandler} 
            type="text" 
            name="AGR" 
            placeholder='Type Here' 
            required
          />
        </div>
        <div className="addproduct-itemfield">
          <p>APPS</p>
          <input 
            value={productDetails.APPS} 
            onChange={changeHandler} 
            type="text" 
            name="APPS" 
            placeholder='Type Here' 
            required
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Select any one</p>
          <select 
            value={productDetails.GA_TW_SV} 
            onChange={changeHandler} 
            name='GA_TW_SV' 
            className='add-product-selector'
          >
            <option value="GA">G/A</option>
            <option value="TW">TW</option>
            <option value="SV">SV</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <p>Value</p>
          <input 
            value={productDetails.value} 
            onChange={changeHandler} 
            type="text" 
            name="value" 
            placeholder='Type Here' 
            required
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select 
          value={productDetails.category} 
          onChange={changeHandler} 
          name='category' 
          className='add-product-selector'
        >
          <option value="card">Cards</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img 
            src={image ? URL.createObjectURL(image) : upload_area} 
            className='addproduct-thumbnail' 
            alt="Upload Area" 
          />
        </label>
        <input 
          onChange={imageHandler} 
          type="file" 
          name='image' 
          id='file-input' 
          hidden 
        />
      </div>
      <button 
        onClick={Add_Product} 
        className='addproduct-btn'
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
