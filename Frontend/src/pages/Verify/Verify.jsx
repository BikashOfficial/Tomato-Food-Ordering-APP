import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    console.log(success,orderId)
    const { url } = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const res = await axios.post(url + "/api/order/verify", { success, orderId })
        if (res.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
        
    )
}

export default Verify