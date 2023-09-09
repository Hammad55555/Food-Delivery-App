import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MenuForm({ onSubmit }) {
  let navigate = useNavigate();

  const [CategoryName, setCategoryName] = useState('');
  const [name, setItemName] = useState('');
  const [img, setItemImg] = useState('');
  const [options, Setoptions] = useState('');
  const [description, setItemDescription] = useState('');
  const [products, setProducts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      CategoryName: CategoryName,
      name: name,
      img: img,
      options: {
        ...options,
      },
      description: description,
    };

    const response = await fetch('http://localhost:5000/api/sam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    console.log(response);
    if (response.ok) {
      alert('Product Add Successfully!');
      navigate('/');
      
      setProducts([...products, newItem]);
      const updatedDataResponse = await fetch('http://localhost:5000/api/sam');
      const updatedData = await updatedDataResponse.json();
      if (typeof onSubmit === 'function') {
        onSubmit(updatedData);
      }
    }

    // Reset form fields here
    setCategoryName('');
    setItemName('');
    setItemImg('');
    Setoptions('');
    setItemDescription('');
  };

  const handleOptionChange = (optionName, value) => {
    Setoptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: value,
    }));
  };

  const renderOptions = () => {
    if (CategoryName === 'Pizza') {
      return (
        <>
          <label htmlFor="regular">regular Price:</label>
          <input
            type="text"
            id="regular"
            className="form-control"
            value={options.regular}
            onChange={(e) => handleOptionChange('regular', e.target.value)}
            required
          />

          <label htmlFor="medium">Medium Price:</label>
          <input
            type="text"
            id="medium"
            className="form-control"
            value={options.medium}
            onChange={(e) => handleOptionChange('medium', e.target.value)}
            required
          />

          <label htmlFor="large">Large Price:</label>
          <input
            type="text"
            id="large"
            className="form-control"
            value={options.large}
            onChange={(e) => handleOptionChange('large', e.target.value)}
            required
          />
        </>
      );
    } else if (CategoryName === 'Biryani/Rice' || CategoryName === 'Fast Food') {
      return (
        <>
          <label htmlFor="half">Half Price:</label>
          <input
            type="text"
            id="half"
            className="form-control"
            value={options.half}
            onChange={(e) => handleOptionChange('half', e.target.value)}
            required
          />

          <label htmlFor="full">Full Price:</label>
          <input
            type="text"
            id="full"
            className="form-control"
            value={options.full}
            onChange={(e) => handleOptionChange('full', e.target.value)}
            required
          />
        </>
      );
    } else {
      return null; // Return null when no specific options are needed
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Add New Menu Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name:</label>
            <select
              id="categoryName"
              className="form-control"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Biryani/Rice">Biryani/Rice</option>
              <option value="Pizza">Pizza</option>
              <option value="Fast Food">Fast Food</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              className="form-control"
              value={name}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemImg">Insert Picture URL</label>
            <input
              type="text"
              id="itemImg"
              className="form-control"
              value={img}
              accept="image/*"
              onChange={(e) => setItemImg(e.target.value)}
              required
            />
          </div>

          {renderOptions()}

          <div className="form-group">
            <label htmlFor="description">Item Description:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </form>
      </div>
    </>
  );
}

export default MenuForm;
