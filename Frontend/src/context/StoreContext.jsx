import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const url = "https://tomato-s9wj.onrender.com"
    const [token, setToken] = useState("")

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev, [itemId]: 1
            }))
        } else {
            setCartItems((prev) => ({
                ...prev, [itemId]: prev[itemId] + 1
            }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: prev[itemId] - 1
        }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }


    const getTotalCartAmout = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const res = await axios.get(url + "/api/food/list")
        setFoodList(res.data.data)
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    const loadCartData = async(token) =>{
        const res = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(res.data.cartData);
    }

    useEffect(() => {
        async function loaddata() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loaddata();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmout,
        url,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
