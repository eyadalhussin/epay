import { createContext, useEffect, useState } from "react";
import CustomerTable from "./components/CustomerTable";
import { BASE_URL, MITARBEITERTOKEN } from "../../../constants/constants";
import axios from "axios";
import CustomerContext from "../../../contexts/CustomerContext";
import EmployeeContext from "../../../contexts/EmployeeContext";
import { Outlet } from "react-router";

function Employee() {
    const [kunden, aktualisiereKunden] = useState([]);
    const [mitarbeiterToken, setMitarbeiterToken] = useState(localStorage.getItem('mitarbeiterToken'));

    // Handle Token
    useEffect(() => {
        if (mitarbeiterToken == null) {
            localStorage.setItem('mitarbeiterToken', MITARBEITERTOKEN);
            setMitarbeiterToken(MITARBEITERTOKEN);
        }

        fetchAllCustomerData();
    }, [mitarbeiterToken]);

    //Fetch CustomerData
    const fetchAllCustomerData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/mitarbeiter/kunden`, {
                headers: {
                    Authorization: `Bearer ${mitarbeiterToken}`
                }
            });

            if (response) {
                aktualisiereKunden(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EmployeeContext.Provider value={{kunden, aktualisiereKunden : fetchAllCustomerData}}>
                {/* <CustomerTable /> */}
                <Outlet />
        </EmployeeContext.Provider>
    );

}

export default Employee;