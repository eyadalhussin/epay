
export default function PaymentMethod(props) {

    const handleSelect = () => {
        props.onSelect(props.name);
    }

    return (
        <div className={`row`}  onClick={handleSelect}>
            <div className="col-xs-12 elevation-light-1 d-flex justify-c align-c f-gap-1 p-1 border-r-1 relative">
                <div className={`radio-container ${props.active ? 'active' : ''}`}>
                    <div className="radio"></div>
                </div>
                <span className="material-symbols-outlined txt-title txt-600">account_balance</span>
                <span className="txt-subhead txt-500 c-txt">{props.name}</span>
            </div>
        </div>
    );
}