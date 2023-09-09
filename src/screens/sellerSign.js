import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SellerSign = () => {
  const [credentials, setCredentials] = useState({
    vendorname: "",
    vendorcompany: "",
    vendornumber: "",
    vendorpassword: "",
    vendoraddress: "",
  });
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createvendor", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vendorname: credentials.vendorname,
          vendorcompany: credentials.vendorcompany,
          vendornumber: credentials.vendornumber,
          vendorpassword: credentials.vendorpassword,
          vendoraddress: credentials.vendoraddress,
        })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        console.log("success true")
        localStorage.setItem("sellToken", json.sellToken); 
        navigate("/")
       
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1621241441637-ea2d3f59db32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")', height: '100vh', backgroundSize: 'cover' }}>
      <Navbar />
      <div className="container">
        <div className="w-50 m-auto mt-5 border bg-dark border-success rounded p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputname" className="form-label">Vendor Name</label>
              <input
                onChange={onChange}
                name="vendorname"
                type="text"
                className="form-control"
                id="inputname"
                required
                placeholder="Vendor Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputcomname" className="form-label">Company Name</label>
              <input
                onChange={onChange}
                name="vendorcompany"
                type="text"
                className="form-control"
                id="inputcomname"
                required
                placeholder="Company Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputnumber" className="form-label">Vendor Number</label>
              <input
                onChange={onChange}
                name="vendornumber"
                type="number"
                className="form-control"
                id="inputnumber"
                required
                placeholder="Vendor Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword4" className="form-label">Vendor Password</label>
              <input
                onChange={onChange}
                name="vendorpassword"
                type="password"
                className="form-control"
                id="inputPassword4"
                required
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputAddress" className="form-label">Restaurant Address</label>
              <input
                onChange={onChange}
                name="vendoraddress"
                type="text"
                className="form-control"
                id="inputAddress"
                required
                placeholder="1234 Main St"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSign;