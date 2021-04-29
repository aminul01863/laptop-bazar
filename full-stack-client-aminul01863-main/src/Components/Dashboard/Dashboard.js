import React, { useEffect, useState } from 'react';
import AdminHome from '../AdminHome/AdminHome';
import './Dashboard.css'
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://afternoon-basin-16086.herokuapp.com/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const deleteProduct = id => {
        fetch(`https://afternoon-basin-16086.herokuapp.com/deleteEvent/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div className="">
            <AdminHome />
            <div className="mt-5 d-flex flex-column justify-content-center">
                <h1 className="text-center mt-5">Manage Product</h1>

                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Price</th>
                                <td className="text-right">action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(pd => {
                                    const { name, price } = pd
                                    return <tr>
                                        <td className="text-center">{name}</td>
                                        <td className="text-center">${price}</td>

                                        <td className="text-right">
                                            <button className="btn "><FontAwesomeIcon icon={faPencilAlt} /></button>
                                            <button className="btn " onClick={() => deleteProduct(pd._id, alert("product-delete"))}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>

        </div>

    );
};

export default Dashboard;