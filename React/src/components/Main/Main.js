import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './Main.scss';

import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
import CustomerOverview from "./Customer/Customer-Overview/CustomerOverview";
import CustomerDesposit from "./Customer/CustomerDesposit/CustomerDeposit";
import CustomerPayout from "./Customer/CustomerPayout/CustomerPayout";
import ECustomerView from "./Employee/ECustomerView/ECustomerView";
import EmployeeOverview from "./Employee/Employee-Overview/EmployeeOverview";
import axios from "axios";
import Login from "./Login/Login";


function Main() {
    const location = useLocation();
    const navigate = useNavigate();
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return (
        <div className={`${!location.pathname.includes('login') ? 'main-container' : ''}`}>
                <Routes>
                    <Route path="customer" element={<Customer/>}>
                        <Route index element={<CustomerOverview/>}></Route>
                        <Route path="overview" element={<CustomerOverview/>}></Route>
                        <Route path="deposit" element={<CustomerDesposit/>}></Route>
                        <Route path="payout" element={<CustomerPayout/>}></Route>
                    </Route>
                    <Route path="employee" element={<Employee/>}>
                        <Route index element={<EmployeeOverview/>}></Route>
                        <Route path="overview" element={<EmployeeOverview/>}></Route>
                        <Route path="customer-view/:kunde_id" element={<ECustomerView/>}></Route>
                    </Route>
                    <Route path="login" element={<Login />}>
                    </Route>
                </Routes>
        </div>
    );
}
export default Main;