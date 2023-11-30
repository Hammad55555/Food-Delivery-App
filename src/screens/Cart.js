import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import { useCart, useDispatchCart } from '../components/ContextRuducer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
   
    }
  }, [data, navigate]);

  const handleCheckOut = async () => {
    if (data.length === 0) {
      alert("Please add products to the cart");
      return; // Prevent further execution of checkout if the cart is empty
    }
    const userEmail = localStorage.getItem("userEmail");
    const orderData = {
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setOrderPlaced(true); // Set the orderPlaced state to true
      } else {
        console.error("Checkout failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        {orderPlaced ? ( // Display thank you message if order is placed
          <div className="text-center">
            <h2>Thank you for your order!</h2>
       

          </div>
        ) : (
          // Display cart items if order is not placed
          <>
            <table className='table table-hover'>
              <thead className='text-success fs-4'>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Option</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{food.name}</td>
                    <td>{food.qty}</td>
                    <td>{food.size}</td>
                    <td className='text-success'>{food.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h1 className='fs-2'>Total Price {totalPrice}</h1>
            </div>
            <div>
              <button onClick={handleCheckOut} className='btn bg-success mt-5'>
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
