import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function PaymentContainer(props) {
    const navigate = useNavigate();

    return (
        <div className="col-xs-12 col-md-3 d-flex f-direction-c justify-sb f-gap-3 elevation-light-1 border-r-1 p-2 m-h-180">
            {/* Headline */}
            <div className="row d-flex justify-sb align-c">
                <span className="txt-subhead txt-500 c-txt">Geld {props.action}</span>
                <span className="material-symbols-outlined">{props.icon}</span>
            </div>
            {/* Divider */}
            <div className="row">
                <div className="h-divider"></div>
            </div>
            {/* Text */}
            <div className="row">
                <span className="txt-body">{props.text}</span>
            </div>
            {/* Button */}
            <div className="row">
                <div className="col-xs-12">
                    <Link to={props.link} className={props.btnType}><span>{props.action}</span></Link>
                </div>
            </div>
        </div>
    );
}