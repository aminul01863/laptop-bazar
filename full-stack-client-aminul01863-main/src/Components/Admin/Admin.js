import axios from 'axios';
import './Admin.css'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminHome from '../AdminHome/AdminHome';

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null)


    const onSubmit = data => {
        const productData = {
            name: data.name,
            imageURL: imageURL,
            price: data.price,
            addDate: new Date()
        };
        const url = `https://afternoon-basin-16086.herokuapp.com/addProduct`

        console.log(productData)

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => console.log(res))
    };

    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'ddd81948c632f3dc749e847715253a54  ')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className=" row main-from">
            <AdminHome />
            <div className="col-md-8 mt-5">
                <h1 className="mt-4 text-center">Add Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="addProduct">
                        <input name="name" placeholder="product name" ref={register} />
                        <br />
                        <input name="price" placeholder="price" ref={register} />
                        <br />
                        <div className="container-img">
                            <input className="upload-box " type="file" onChange={handleImageUpload} />
                        </div>
                        <br />
                        <input className="btn btn-success" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;