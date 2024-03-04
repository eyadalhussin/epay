import { useContext, useEffect, useState } from "react";
import EmployeeContext from "../../../../contexts/EmployeeContext";
import { sortByKontostand } from "../../../../functions/sort";
import { Link } from "react-router-dom";

export default function CustomerTable() {

    const { kunden, aktualisierenKunden } = useContext(EmployeeContext);
    const [sortedKundenListe, setSortedKundenListe] = useState([]);
    const [sortMenu, setSortMenu] = useState(false);
    const [sortMenuValue, setSortMenuValue] = useState('DESC');

    //Aktualisieren Kunden
    useEffect(() => {
        setSortedKundenListe(sortByKontostand(kunden, 'DESC'));
    }, [kunden]);

    useEffect(() => {
        setSortedKundenListe(sortByKontostand(kunden, sortMenuValue));
    }, [sortMenuValue]);

    const checkIfAusstehend = (transaktionsListe) => {
        let erg = false;
        transaktionsListe.forEach(transaktion => {
            if (transaktion.status === 'AUSSTEHEND')
                erg = true;
        });
        return erg;
    }

    const checkColor = (number) => {
        if (number == 0) return 'c-txt';
        if (number > 0) return 'c-succ-700';
        if (number < 0) return 'c-danger-700';
    }

    if (!kunden)
        return (
            <div className="row"><h1>Loading</h1></div>
        );


    return (
        <div className="d-flex f-direction-c elevation-light-1 border-r-1 p-h-2">
            <div className="row d-flex justify-sb align-c">
                <h2>Kunden Liste ({kunden.length}) </h2>
                <div className={`dd-cont ${sortMenu ? 'active' : ''}`} onClick={() => setSortMenu(!sortMenu)}>
                    <span className="value">Kontostand</span>

                    {sortMenuValue.includes('DESC') ?
                        <span className="material-symbols-outlined c-succ-700 txt-title">arrow_downward_alt</span>
                        :
                        <span className="material-symbols-outlined c-danger-700 txt-title">arrow_upward_alt</span>
                    }

                    <div className="options">
                        {/* Sort Kontostand ASC */}
                        <div className="option" onClick={() => setSortMenuValue('DESC')}>
                            <span>Kontostand</span>
                            <span className="material-symbols-outlined c-succ-700 txt-title">arrow_downward_alt</span>
                        </div>

                        {/* Sort Kontostand DESC */}
                        <div className="option" onClick={() => setSortMenuValue('ASC')}>
                            <span>Kontostand</span>
                            <span className="material-symbols-outlined c-danger-700 txt-title">arrow_upward_alt</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="t-head"><span>ID</span></div>
                    <div className="t-head"><span>Name</span></div>
                    <div className="t-head"><span>E-Mail</span></div>
                    <div className="t-head"><span>Kontostand</span></div>
                    <div className="t-head"><span>T-Status</span></div>
                </div>
                <div className="table-body">
                    {sortedKundenListe.map((kunde, index) => (
                        <Link className="no-deco t-body-hover" to={{ pathname:`/employee/customer-view/${kunde.id}`}} key={index}>
                            <div className="table-body-item">
                                <div className="t-body"><span className="txt-500 c-txt">{kunde.id}</span></div>
                                <div className="t-body"><span className="txt-500 c-txt">{kunde.name}</span></div>
                                <div className="t-body"><span className="txt-500 c-txt">{kunde.email}</span></div>
                                <div className="t-body"><span className={`${checkColor(kunde.konto.kontostand)}`}>+ {kunde.konto.kontostand.toFixed(2)} €</span></div>
                                <div className="t-body">
                                    <div className={`t-status ${checkIfAusstehend(kunde.konto.transaktionen) ? 'danger' : 'success'}`}>
                                        <span className={`txt-caption`}>
                                            {checkIfAusstehend(kunde.konto.transaktionen) ? 'Ausstehend' : 'Bestätigt'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}