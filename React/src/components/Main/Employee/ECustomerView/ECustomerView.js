import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import EmployeeContext from "../../../../contexts/EmployeeContext";
import './ECustomerView.scss';
import { BASE_URL } from "../../../../constants/constants";
import axios from "axios";
import { sortByDateASC, sortByDateDESC } from "../../../../functions/sort";

export default function ECustomerView() {
    const { kunden, aktualisiereKunden } = useContext(EmployeeContext);
    const { kunde_id } = useParams();
    const [kunde, setKunde] = useState(null);
    const [sortedTransaktionenListe, setSortedTransaktionenListe] = useState([]);

    const [sortMenu, setSortMenu] = useState(false);
    const [sortMenuValue, setSortMenuValue] = useState('DESC');

    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        if (kunden.length > 1 && kunde_id) {
            const selectedKunde = kunden[kunde_id - 1];
            if (selectedKunde && selectedKunde.konto) {
                setKunde(selectedKunde);
                const sorted = sortByDateDESC(selectedKunde.konto.transaktionen);
                console.log(sorted);
                setSortedTransaktionenListe(sorted);
            }
        } else {
            aktualisiereKunden();
        }
    }, [kunden, kunde_id]);

    const checkOffeneAuftraege = (transaktionen) => {
        let erg = false;
        transaktionen.forEach(transaktion => {
            if (transaktion.status == 'AUSSTEHEND')
                erg = true;
        });
        return erg;
    }

    const checkColor = (number) => {
        if (number == 0) return 'c-txt';
        if (number > 0) return 'c-succ-700';
        if (number < 0) return 'c-danger-700';
    }

    const checkTransaktionStatus = (transaktion) => {
        return transaktion.status == 'AUSSTEHEND';
    }

    //Handle Genehmigung
    const handleTransaktionGenehmigung = async (transaktion_id, betrag) => {
        if (betrag > kunde.konto.kontostand) return;
        setLoadingState(true);
        const mitarbeiterToken = localStorage.getItem('mitarbeiterToken');
        if (!mitarbeiterToken) return;

        try {
            const url = new URL(`${BASE_URL}/api/mitarbeiter/transaktionen/${transaktion_id}/approve`);
            const response = await axios.post(url.toString(), {}, {
                headers: {
                    Authorization: `Bearer ${mitarbeiterToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                aktualisiereKunden();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingState(false);
        }
    }


    if (!kunde || !kunde.konto) {
        return (
            <div className="">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="container d-flex f-direction-c f-gap-4">

            {/* //Page Loader */}
            {loadingState ?
                <div className="page-loader-container">
                    <div className="message-container elevation-light-1">
                        <div className="loader"></div>
                        <h2>Loading ....</h2>
                    </div>
                </div>
                :
                ''
            }
            {/* //Page Loader */}

            <div className="row">
                <div className="col-xs-12">
                    <h2 className="c-txt">Kundenview von {kunde.name}</h2>
                </div>

                {/* Kunde Info */}
                <div className="col-xs-12 col-md-4 d-flex f-direction-c elevation-light-1 border-r-1 p-2 f-gap-1">
                    <div className="row m-b-2">
                        <span className="txt-headline txt-500 c-txt">Kundeninfo</span>
                    </div>

                    <div className="row d-flex justify-sb align-c">
                        <span className="txt-body txt-500 c-txt">Name</span>
                        <span className="txt-subhead txt-500 c-txt">Frank</span>
                    </div>

                    <div className="row d-flex justify-sb align-c">
                        <span className="txt-body txt-500 c-txt">Email</span>
                        <span className="txt-subhead txt-500 c-txt">{kunde.email}</span>
                    </div>

                    <div className="row d-flex justify-sb align-c">
                        <span className="txt-body txt-500 c-txt">Kontostand</span>
                        <span className="txt-subhead txt-500 c-succ-700">+ {kunde.konto.kontostand.toFixed(2)} €</span>
                    </div>

                    <div className="row d-flex justify-sb align-c">
                        <span className="txt-body txt-500 c-txt">Offene Aufträge</span>
                        <span className={`txt-subhead txt-600 c-txt ${checkOffeneAuftraege(kunde.konto.transaktionen) ? 'c-danger-700' : 'c-succ-700'}`}>
                            {checkOffeneAuftraege(kunde.konto.transaktionen) ? 'JA' : 'NEIN'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Transaktionen */}
            <form className="d-flex f-direction-c elevation-light-1 border-r-1 p-h-2">
                <div className="row d-flex justify-sb align-c">
                    <h2>Transaktionen({kunde.konto.transaktionen.length}) </h2>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <div className="t-head"><span>ID</span></div>
                        <div className="t-head if-md"><span>Datum</span></div>
                        <div className="t-head if-md"><span>Uhrzeit</span></div>
                        <div className="t-head"><span>Betrag</span></div>
                        <div className="t-head d-flex"><span>Status</span></div>
                        {
                            checkOffeneAuftraege(kunde.konto.transaktionen) ? <div className="t-head"><span>Genehmigen</span></div> : ''
                        }


                    </div>
                    <div className="table-body">
                        {sortedTransaktionenListe.map((transaktion, index) => (
                            <div className="table-body-item" key={index}>
                                <div className="t-body"><span className="txt-500 c-txt">{transaktion.transaktion_id}</span></div>
                                <div className="t-body if-md"><span className="txt-500 c-txt">{transaktion.datum}</span></div>
                                <div className="t-body if-md"><span className="txt-500 c-txt">{transaktion.time}</span></div>
                                <div className="t-body">
                                    <span className={`${transaktion.transaktionstyp === 'EINZAHLUNG' ? 'c-succ-700' : 'c-danger-700'}`}>
                                        {transaktion.transaktionstyp === 'EINZAHLUNG' ? '+' : '-'}
                                        {transaktion.betrag.toFixed(2)} €
                                    </span>
                                </div>

                                <div className="t-body">
                                    <div className={`t-status ${checkTransaktionStatus(transaktion) ? 'danger' : 'success'}`}>
                                        <span className={`txt-caption`}>
                                            {checkTransaktionStatus(transaktion) ? 'Ausstehend' : 'Bestätigt'}
                                        </span>
                                    </div>
                                </div>

                                {
                                    checkOffeneAuftraege(kunde.konto.transaktionen) ?
                                        <div className="t-body d-flex">
                                            {transaktion.status === 'AUSSTEHEND' ?
                                                <button className={`btn-approve ${transaktion.betrag > kunde.konto.kontostand ? 'disabled' : ''}`} type="button" onClick={() => handleTransaktionGenehmigung(transaktion.transaktion_id, transaktion.betrag)} >Genehmigen</button>
                                                : ''
                                            }
                                        </div>
                                        : ''
                                }

                            </div>
                        ))}
                    </div>
                </div>
            </form>

        </div>
    );
}