import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Order.css'
import Header from '../Header/Header';
import { useHistory } from 'react-router';

const Order = () => {
    const [productsDetail, setProductsDetail] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { email } = loggedInUser
    const [cartProducts, setCartProducts] = useState([])
    console.log(email);

    const history = useHistory()

    const total = productsDetail.reduce((total, pd) => total + parseInt(pd.price), 0);

    useEffect(() => {
        fetch(`https://afternoon-basin-16086.herokuapp.com/cartProducts/${email}`)
            .then(res => res.json())
            .then(data => setCartProducts(data))
            .catch(err => {
                console.log(err);
            })
        console.log('hook running');
    }, [email])

    useEffect(() => {
        const cartProductsId = cartProducts.map(pd => pd.productId)
        fetch('https://afternoon-basin-16086.herokuapp.com/productsDetailId', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartProductsId)
        })
            .then(res => res.json())
            .then(data => setProductsDetail(data))
        console.log('hook riakDBCKASBNC');
    }, [cartProducts])
    const handleCheckout = () => {
        history.push('/home')
        const { displayName, email } = loggedInUser;
        const orderDetails = {
            name: displayName,
            email,
            productsDetail,
            quantity: 1,
            createDate: new Date()
        }
        fetch('https://afternoon-basin-16086.herokuapp.com/submitOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return (
        <div>
            <Header />
            <div className="container">
                <div className="container shadow p-3 mb-5 bg-white rounded ">
                    {
                        productsDetail.length === 0 ? "Please Wait" : productsDetail.map(pd => <h3 className="order-cart p-2"><span>{pd.name}</span>  <span className="checkout">  ${pd.price}</span></h3>)
                    }
                </div>
                <div className="text-right">
                    <h3>Total: ${total}</h3>
                    <button className="btn btn-danger text-light" onClick={() => handleCheckout(alert('Order Successful...'))}>Checkout</button>
                </div>

            </div>
        </div>
    );
};

export default Order;