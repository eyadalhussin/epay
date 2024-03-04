import "./CustomerAccountInfo.scss";
import CustomerBalance from "./CustomerBalance/CustomerBalance";
import PaymentContainer from "./PaymentContainer/PaymentContainer";

export default function CustomerAccountInfo(props) {
    return (
        <div>
            {/* Headline */}
            <div className="row">
                <span className="txt-title txt-500 c-txt">Konto Übersicht</span>
            </div>

            <div className="account-info-container m-t-2">
                <CustomerBalance konto={props.konto} />
                <PaymentContainer konto={props.konto} key="1" link="/customer/deposit" btnType="btn-filled-prim-700" action="Einzahlen" text="Geld einzahlen und dein Konto aufladen" icon="credit_card" />
                <PaymentContainer konto={props.konto} key="2" link="/customer/payout" btnType="btn-outlined-prim-700" action="Auszahlen" text="Geld vom Konto auszahlen" icon="payments" />
            </div>
        </div>
    );
}