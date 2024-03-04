import { useEffect, useState } from "react";

export default function CustomerBalance(props) {

    const [ausstehend, setAusstehend] = useState(0);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const transaktionenListe = props.konto.transaktionen;
        let erg = 0;
        transaktionenListe.forEach(element => {
            if(element.status === 'AUSSTEHEND') erg += element.betrag;
        });

        setAusstehend(erg);
        setSaldo(props.konto.kontostand - ausstehend);
    },[]);
    
    return (
        <div className="col-xs-12 col-md-5 m-h-180 d-flex f-direction-c f-gap-3 elevation-light-1 border-r-1 p-2">
            {/* Headline */}
            <div className="row d-flex justify-sb align-c">
                <span className="txt-subhead txt-600 c-txt">Kontostand</span>
                <span className="material-symbols-outlined c-txt">euro_symbol</span>
            </div>
            {/* //Headline */}


            {/* Divider */}
            <div className="row d-flex justify-c align-c">
                <div className="h-divider"></div>
            </div>
            {/* //Divider */}

            {/* Credit */}
            <div className="row d-flex ">
                <div className="col-xs-6 d-flex f-direction-c f-gap-1">
                    <div className="row">
                        <span className="txt-body txt-500 c-txt">Guthaben</span>
                    </div>
                    <div className="row">
                        <span className="txt-subhead txt-500 c-txt">
                            {props.konto.kontostand.toFixed(2)} €
                            </span>
                    </div>
                </div>

                <div className="col-xs-6 d-flex f-direction-c f-gap-1 align-e">
                    <div className="row">
                        <span className="txt-body txt-500 c-txt">Ausstehend</span>
                    </div>
                    <div className="row">
                        <span className="txt-subhead txt-500 c-danger-700">- {ausstehend.toFixed(2) } €</span>
                    </div>
                </div>
            </div>
            {/* //Credit */}

            {/* Total Amount */}
            <div className="row d-flex justify-sb align-c">
                <span className="txt-title txt-600 c-txt">Gesamtsaldo</span>
                <span className="txt-title txt-600 c-succ-700">+ {saldo.toFixed(2)} €</span>
            </div>
            {/* //Total Amount */}
        </div>
    )
}