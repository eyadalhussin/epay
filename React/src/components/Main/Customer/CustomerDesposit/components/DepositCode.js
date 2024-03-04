import { useContext, useState } from "react"
import { BASE_URL } from "../../../../../constants/constants";
import axios from "axios";
import CustomerContext from "../../../../../contexts/CustomerContext";

export default function DepositCode() {

    const [inputFieldValue, setInputFieldValue] = useState('');

    const {kunde, aktualisiereKunde} = useContext(CustomerContext);

    const handleCode = async (e) => {
        e.preventDefault();
        const kundenToken = localStorage.getItem('kunde1Token');
        console.log(kundenToken);

        if (!kundenToken) return;

        try {
            const url = new URL(`${BASE_URL}/api/me/addBetrag`);
            url.searchParams.append('betrag', 50);

            const response = await axios.post(url.toString(), {}, {
                headers: {
                    Authorization: `Bearer ${kundenToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            aktualisiereKunde();
        }
    }

    return (
        <form className="col-xs-12 col-md-5 d-flex f-direction-c f-gap-3 elevation-light-1 border-r-1 p-2" onSubmit={handleCode}>
            <div className="row">
                <span className="txt-title txt-500 c-txt">Gutschein Einlösen</span>
            </div>

            {/* Input-field */}
            <div className="row">
                <div className="col-xs-12">
                    <div className="input-container">
                        <input type="text" className="input-field" required />
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="row">
                <div className="col-xs-12">
                    <button className={`btn-outlined-prim-700 ${inputFieldValue === '' ? 'disabled' : ''}`}><span>Einlösen</span></button>
                </div>
            </div>
        </form>
    )
}