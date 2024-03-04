import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);

    const isActive = (path) => location.pathname === path;


    useEffect(() => {
        location.pathname.includes('login') ? setLoggedIn(false) : setLoggedIn(true);
    }, [location])

    if(!loggedIn){
        return(
            <div className=""></div>
        );
    }

    const logout = () => {
        location.pathname.includes('customer') ? localStorage.setItem('kunde1Token', '') : localStorage.setItem('mitarbeiterToken', '');
        navigate('/login');
    }

    return (
        <div className="sidebar">
            {/* Logo Container */}
            <div className="logo-container">
                <span className="txt-headline txt-700 c-txt">E-<span className="c-prim-700">Pay</span></span>
            </div>

            {/* Navs */}
            <div className="navs-container">
                <div className="navs-header">
                    <span className="header no-display">Kunde</span>
                </div>
                {/* Home */}
                <Link className={`nav ${isActive('/customer') ? 'active' : ''}`} to={'/customer'}>
                    <span className="material-symbols-outlined c-txt">grid_view</span>
                    <span className="txt-subhead txt-500 c-txt no-display">Übersicht</span>
                </Link>
                {/* Deposit */}
                <Link className={`nav ${isActive('/customer/deposit') ? 'active' : ''}`} to={'/customer/deposit'}>
                    <span className="material-symbols-outlined c-txt">call_received</span>
                    <span className="txt-subhead txt-500 c-txt no-display">Einzahlen</span>
                </Link>
                {/* Payout */}
                <Link className={`nav ${isActive('/customer/payout') ? 'active' : ''}`} to={'/customer/payout'}>
                    <span className="material-symbols-outlined c-txt">credit_card</span>
                    <span className="txt-subhead txt-500 c-txt no-display">Auszahlen</span>
                </Link>
                <div className="divider"></div>
            </div>
            {/* Mitarbeiter */}

            {/* Navs */}
            <div className="navs-container">
                <div className="navs-header">
                    <span className="header no-display">Mitarbeiter</span>
                </div>
                {/* Home */}
                <Link className={`nav ${isActive('/employee') ? 'active' : ''}`} to={'/employee'}>
                    <span className="material-symbols-outlined c-txt">grid_view</span>
                    <span className="txt-subhead txt-500 c-txt no-display">Übersicht</span>
                </Link>
                {/* Deposit */}
                {/* <Link className={`nav ${isActive('/employee/customer-view/**') ? 'active' : ''}`} to={'/employee/customer-view/1'}>
                    <span className="material-symbols-outlined c-txt">support_agent</span>
                    <span className="txt-subhead txt-500 c-txt no-display">Kunde</span>
                </Link> */}
                <div className="divider"></div>

                <div className="navs-container">
                    <div className="nav" onClick={() => logout()}>
                        <span className="material-symbols-outlined c-txt">logout</span>
                        <span className="txt-subhead txt-500 c-txt no-display">Ausloggen</span>
                    </div>
                </div>
            </div>

        </div>
    );
}