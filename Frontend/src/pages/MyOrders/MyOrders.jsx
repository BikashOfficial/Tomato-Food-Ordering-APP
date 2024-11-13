import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const res = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setData(res.data.data);
    // console.log(res.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {
          data.map((order, idx) => {
            return (
              <div className="my-orders-order" key={idx}>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item, idx) => {

                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }

                })}</p>
                <p>${order.amount}.00</p>
                <p>Items :{order.items.length}</p>
                <p><span>&#x25cf;</span><strong>{order.status}</strong></p>
                <button onClick={fetchOrder}>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders
