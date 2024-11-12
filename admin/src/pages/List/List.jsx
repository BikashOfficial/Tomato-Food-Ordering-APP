import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

function List({url}) {

  const [list,setList] = useState([]);

  const fetchList = async()=>{
    const res = await axios.get(`${url}/api/food/list`)
    console.log(res.data)
    if(res.data.success){
      setList(res.data.data)
    }else{
      toast.error("error") 
    }
  }

  const removeFood = async(foodId) =>{
    const res = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message)
    }else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {list.map((item,idx)=>{
          return(
            <div key={idx} className='list-table-format'>
              <img src={`${url}/images/`+item.image}></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <img className='icon' onClick={()=>removeFood(item._id)} src={assets.remove_icon_red} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List