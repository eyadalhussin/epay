import './CustomerOverview.scss';

import { React, useContext } from "react";
import CustomerAccountInfo from "./CustomerAccountInfo/CustomerAccountInfo";
import CustomerActivities from "./CustomerActivities/CustomerActivities";
import CustomerContext from '../../../../contexts/CustomerContext';

function CustomerOverview() {

    const {kunde, aktualisiereKunde} = useContext(CustomerContext);

    if (!kunde) {
        return (
            <div className="">Lädt.....</div>
        );
    }

    return (
        <div className="c-container d-flex f-direction-c f-gap-4 fade-in">

            <div className="row">
                {/* <span className="txt-headline txt-500 c-txt">Hello ! {kunde.name}</span> */}
                <span className="txt-display-1 txt-500 c-txt">Hallo {kunde.name} !</span>
            </div>

            {/* Account Info */}
            <CustomerAccountInfo konto={kunde.konto} />

            {/* Activites */}
            <CustomerActivities transaktionen={kunde.konto.transaktionen} />

        </div>
    );
}

export default CustomerOverview;
