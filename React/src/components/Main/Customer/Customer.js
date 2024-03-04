import { React, useEffect, useState, useContext } from "react";
import { Outlet } from "react-router";
import { BASE_URL } from "../../../constants/constants";
import axios from 'axios';
import CustomerContext from "../../../contexts/CustomerContext";

function Customer() {
    const [kunde, setKunde] = useState(null);

    const kunden1Token = localStorage.getItem('kunde1Token');

    const fetchCustomerData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/me`, {
                headers: {
                    Authorization: `Bearer ${kunden1Token}`
                }
            });
            setKunde(response.data);
        } catch (error) {
            console.error("Error fetching customer data", error);
        }
    }

    useEffect(() => {
        fetchCustomerData();
    }, []);

    return (
        <CustomerContext.Provider value={{kunde, aktualisiereKunde: fetchCustomerData}}>
            <Outlet />
        </CustomerContext.Provider>
    );
}

export default Customer;
