import { useContext, useState } from "react";
import PaymentMethod from "./PaymentMethod";
import "./radio.scss";
import axios from "axios";
import { BASE_URL } from "../../../../../constants/constants";
import CustomerContext from "../../../../../contexts/CustomerContext";

export default function DepositBalance(props) {

    const {kunde, aktualisiereKunde} = useContext(CustomerContext);

    //Handle btn State
    const [btnDisabled, setBtnDisabled] = useState(true);

    //Handle Text State
    const [saldoNachEinzahlung, setSaldoNachEinzahlung] = useState(kunde.konto.kontostand);

    //Handle input State
    const [inputBetrag, setInputBetrag] = useState(0);

    //Handle PaymentMethod
    const [paymentMethod, setPaymentMethod] = useState("Bank");

    const inputChange = event => {
        let value = event.target.value;
        if (value === "") {
            value = "0";
        }
        if (parseFloat(value) > 10000) {
            value = "10000";
            event.target.value = value;
        }
        parseFloat(value) > 1 ? setBtnDisabled(false) : setBtnDisabled(true);
        setInputBetrag(parseFloat(value));
        setSaldoNachEinzahlung(parseFloat(value) + kunde.konto.kontostand);
    }

    //Handle Payment
    const handlePayment = async (e) => {
        e.preventDefault();
        const kundenToken = localStorage.getItem('kunde1Token');

        if (btnDisabled || !kundenToken) return;

        try {
            const url = new URL(`${BASE_URL}/api/me/addBetrag`);
            url.searchParams.append('betrag', inputBetrag);

            const response = await axios.post(url.toString(), {}, {
                headers: {
                    Authorization: `Bearer ${kundenToken}`,
                    'Content-Type': 'application/json'
                }
            });
            setInputBetrag(0);
        } catch (error) {
            console.log(error);
        } finally{
            aktualisiereKunde();
        }
    }

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
    }

    return (
        <form className="col-xs-12 col-md-5 d-flex f-direction-c f-gap-3 elevation-light-1 border-r-1 p-2" onSubmit={handlePayment}>
            {/* Headline */}
            <div className="row d-flex justify-sb align-c">
                <span className="span txt-subhead txt-500 c-txt">Saldo</span>
                <span className="span txt-title txt-500 c-txt">{kunde.konto.kontostand.toFixed(2)}€</span>
            </div>

            <div className="col-xs-12">
                <div className="h-divider"></div>
            </div>

            {/* Input */}
            <div className="row">
                <div className="col-xs-4">
                    <div className="input-container">
                        <input type="number" className="input-field" required placeholder="Betrag" value={inputBetrag} onChange={inputChange} />
                    </div>
                </div>
            </div>

            {/* Amount after deposit */}
            <div className="row d-flex justify-sb align-c">
                <span className="span txt-body txt-500 c-txt">Saldo nach der Einzahlung:</span>
                <span className="span txt-title txt-600 c-succ-700">+ {saldoNachEinzahlung.toFixed(2)} €</span>
            </div>

            {/* Payment Methods */}
            <PaymentMethod onSelect={handlePaymentMethodSelect} name="Bank" active={paymentMethod === 'Bank'} />
            <PaymentMethod onSelect={handlePaymentMethodSelect} name="PayPal" active={paymentMethod === 'PayPal'}/>
            <PaymentMethod onSelect={handlePaymentMethodSelect} name="Credit" active={paymentMethod === 'Credit'}/>

            {/* Payment Button */}
            <div className="row">
                <div className="col-xs-12">
                    <button className={`btn-filled-prim-700 ${btnDisabled ? 'disabled' : ''}`} type='submit' ><span>Einzahlen</span></button>
                </div>
            </div>


        </form>
    )
}