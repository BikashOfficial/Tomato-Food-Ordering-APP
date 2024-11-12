import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

function Add({url}) {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({

        name: "",
        description: "",
        price: "",
        category: "Salad"

    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name);
        console.log(value);

        setData(data => ({ ...data, [name]: value }))
    }

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const fromData = new FormData();
        fromData.append("name", data.name)
        fromData.append("description", data.description)
        fromData.append("price", Number(data.price))
        fromData.append("category", data.category)
        fromData.append("image", image)
        const res = await axios.post(`${url}/api/food/add`, fromData);

        if (res.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Write content here' rows='6' required />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' min={0} />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add