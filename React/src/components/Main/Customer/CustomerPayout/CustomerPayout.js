import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CustomerContext from "../../../../contexts/CustomerContext";
import PayoutBalance from "./PayoutBalance";

export default function CustomerPayout() {
    const navigate = useNavigate();

    const { kunde , aktualisiereKunde } = useContext(CustomerContext);

    if (!kunde)
        return (
            <div className="row"><h1>Loading</h1></div>
        );

    return (
        <div className="c-container d-flex f-direction-c f-gap-4 fade-in">
            {/* Headline */}
            <div className="row d-flex align-c f-gap-2">
                <span onClick={() => navigate('/customer')} className="material-symbols-outlined txt-700 c-prim-700 t3e">arrow_back</span>
                <div className="span txt-headline txt-500 c-txt">Geld Auszahlen</div>
            </div>

            <div className="row d-flex justify-s align-s f-gap-3">
                {/* Deposit */}
                <PayoutBalance kunde={kunde} />

                
            </div>
        </div>
    );
}