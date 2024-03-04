import { useContext, useState } from "react";
import PaymentMethod from "../CustomerDesposit/components/PaymentMethod";
import "../CustomerDesposit/components/radio.scss";
import axios from "axios";
import { BASE_URL } from "../../../../constants/constants";
import CustomerContext from "../../../../contexts/CustomerContext";
import { useNavigate } from "react-router";

export default function PayoutBalance() {
    const navigate = useNavigate();

    const { kunde, aktualisiereKunde } = useContext(CustomerContext);

    //Handle btn State
    const [btnDisabled, setBtnDisabled] = useState(true);

    //Handle Text State
    const [saldoNachEinzahlung, setSaldoNachEinzahlung] = useState(kunde.konto.kontostand);

    //Handle input State
    const [inputBetrag, setInputBetrag] = useState(0);

    //Handle PaymentMethod
    const [paymentMethod, setPaymentMethod] = useState("Bank");

    //Handle loading
    const [loadingMessage, setLoadingMessage] = useState('');
    const [loadingState, setLoadingState] = useState('idle');

    const inputChange = event => {
        let value = event.target.value;
        if (value === "") {
            value = "0";
        }
        if (parseFloat(value) > kunde.konto.kontostand) {
            value = kunde.konto.kontostand;
            event.target.value = value;
        }
        parseFloat(value) > 1 ? setBtnDisabled(false) : setBtnDisabled(true);
        setInputBetrag(parseFloat(value));
        setSaldoNachEinzahlung(kunde.konto.kontostand - parseFloat(value));
    }

    //Handle Payment
    const handlePayment = async (e) => {
        setLoadingState('loading');
        setLoadingMessage('Loading ....');

        e.preventDefault();
        const kundenToken = localStorage.getItem('kunde1Token');
        console.log(kundenToken);

        if (btnDisabled || !kundenToken) return;

        try {
            const url = new URL(`${BASE_URL}/api/me/removeBetrag`);
            url.searchParams.append('betrag', inputBetrag);

            const response = await axios.post(url.toString(), {}, {
                headers: {
                    Authorization: `Bearer ${kundenToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setLoadingState('success');
            setLoadingMessage('Deine Buchung wurde erfolgreich ermittelt !');
            aktualisiereKunde();
            console.log(response);
            setTimeout(() => {
                navigate('/customer');
            }, 3000);
        } catch (error) {
            setLoadingState('error');
            setLoadingMessage('Ein Fehler mit der Buchung ist aufgetreten !');
            console.log(error);
        } finally {
            setInputBetrag(0);
        }
    }

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
    }

    return (
        <div className="container d-flex f-direction-c f-gap-4">
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
                            <input type="number" className="input-field" required placeholder="Betrag" onChange={inputChange} />
                        </div>
                    </div>
                </div>

                {/* Amount after deposit */}
                <div className="row d-flex justify-sb align-c">
                    <span className="span txt-body txt-500 c-txt">Saldo nach der Auszahlung:</span>
                    <span className={`span txt-title txt-600 ${(kunde.konto.kontostand - inputBetrag) != kunde.konto.kontostand ? 'c-danger-700' : 'c-txt'}`}> {saldoNachEinzahlung.toFixed(2)} €</span>
                </div>

                {/* Payment Methods */}
                <PaymentMethod onSelect={handlePaymentMethodSelect} name="Bank" active={paymentMethod === 'Bank'} />
                <PaymentMethod onSelect={handlePaymentMethodSelect} name="PayPal" active={paymentMethod === 'PayPal'} />
                <PaymentMethod onSelect={handlePaymentMethodSelect} name="Credit" active={paymentMethod === 'Credit'} />

                {/* Payment Button */}
                <div className="row">
                    <div className="col-xs-12">
                        <button className={`btn-filled-prim-700 ${btnDisabled ? 'disabled' : ''}`} type='submit' ><span>Auszahlen</span></button>
                    </div>
                </div>
            </form>

            {/* Progress */}
            <div className="col-xs-12 col-md-5">
                <div className={`loading-container ${loadingState}`}>
                    <div className="loader"></div>
                    <span className="message">{loadingMessage}</span>
                </div>
            </div>
        </div>
    )
}