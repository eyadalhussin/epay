import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL, MITARBEITERTOKEN } from "../../../../constants/constants";
import { converStringToDate } from "../../../../functions/date";

export default function Transactionslnfo() {

    const [mitarbeiterToken, setMitarbeiterToken] = useState(localStorage.getItem('mitarbeiterToken'));

    const [transaktionen, setTransaktionen] = useState(null);
    const [filteredTransaktionen, setFilteredTransaktionen] = useState([]);

    const [summeEinzahlungen, setSummeEinzahlungen] = useState(0);
    const [summeAuszahlungen, setSummeAuszahlungen] = useState(0);
    const [summeAusstehend, setSummeAusstehend] = useState(0);
    const [saldo, setSaldo] = useState(0);

    const [vonDatum, setVonDatum] = useState(new Date());
    const [bisDatum, setBisDatum] = useState(new Date());

    const [inputVonDatum, setInputVonDatum] = useState('');
    const [inputBisDatum, setInputBisDatum] = useState('');

    const handleVonInput = (e) => {
        setVonDatum(new Date(e.target.value));
        setInputVonDatum(e.target.value);
    }

    const handleBisInput = (e) => {
        setBisDatum(new Date(e.target.value));
        setInputBisDatum(e.target.value);
    }




    const filterTransaktionenNachDatum = (transaktionen, von, bis) => {
        const filtered = transaktionen.filter((transaktion) => {
            const convertedDate = converStringToDate(transaktion.datum);
            return convertedDate >= von && convertedDate <= bis;
        });
        setFilteredTransaktionen(filtered);
    }


    const berechneSummeEinzahlungen = (transaktionen) => {
        let summe = 0;
        transaktionen.forEach(transaktion => {
            if (transaktion.transaktionstyp === 'EINZAHLUNG') {
                summe += transaktion.betrag;
            }
        });
        return summe;
    }

    const berechneSummeAuszahlungen = (transaktionen) => {
        let summe = 0;
        transaktionen.forEach(transaktion => {
            if ((transaktion.transaktionstyp === 'AUSZAHLUNG') && (transaktion.status === 'BESTAETIGT')) {
                summe += transaktion.betrag;
            }
        });
        return summe;
    }

    const berechneSummeAusstehend = (transaktionen) => {
        let summe = 0;
        transaktionen.forEach(transaktion => {
            if ((transaktion.transaktionstyp === 'AUSZAHLUNG') && (transaktion.status === 'AUSSTEHEND')) {
                summe += transaktion.betrag;
            }
        });
        return summe;
    }

    useEffect(() => {
        if (filteredTransaktionen) {
            const einzahlungen = berechneSummeEinzahlungen(filteredTransaktionen).toFixed(2)
            setSummeEinzahlungen(einzahlungen);
            const auszahlungen = berechneSummeAuszahlungen(filteredTransaktionen).toFixed(2)
            setSummeAuszahlungen(auszahlungen);
            const ausstehend = berechneSummeAusstehend(filteredTransaktionen).toFixed(2)
            setSummeAusstehend(ausstehend);

            setSaldo((einzahlungen - auszahlungen - ausstehend).toFixed(2));
        }
    }, [filteredTransaktionen])



    // Handle Token
    useEffect(() => {
        if (mitarbeiterToken == null) {
            localStorage.setItem('mitarbeiterToken', MITARBEITERTOKEN);
            setMitarbeiterToken(MITARBEITERTOKEN);
        }
        fetchTransaktionen();
    }, [mitarbeiterToken]);

    //Fetch TransaktionenData
    const fetchTransaktionen = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/mitarbeiter/transaktionen`, {
                headers: {
                    Authorization: `Bearer ${mitarbeiterToken}`
                }
            });

            if (response) {
                setTransaktionen(response.data);
                setFilteredTransaktionen(response.data);
                setInputVonDatum(response.data[0].datum);
                setInputBisDatum(response.data[response.data.length - 1].datum);
                // if(von && bis){
                //     setVonDatum(von);
                //     setBisDatum(bis);
                // }
                console.log(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (!transaktionen)
        return (
            <div>
                <h2>Loading Transaktionen....</h2>
            </div>
        );

    return (
        <div className="no-padding-container m-b-2">
            {/* Info */}
            <div className="col-xs-12 col-md-4 elevation-light-1 d-flex f-direction-c f-gap-2 p-2  border-r-1">

                <div className="row">
                    <span className="txt-headline txt-500 c-txt">Buchungsinfo</span>
                </div>

                <div className="h-divider">

                </div>

                <div className="row d-flex f-gap-3 align-c">
                    <span className="txt-subhead txt-500 c-txt">Zeitraum</span>
                    <input className="input-date" type="date" value={inputVonDatum} onChange={(e) => handleVonInput(e)}/>
                    <input className="input-date" type="date" value={inputBisDatum} onChange={(e) => handleBisInput(e)} />
                </div>

                <div className="row" onClick={() => filterTransaktionenNachDatum(transaktionen, vonDatum, bisDatum)}>
                    <div className="col-xs-12">
                        <div className="btn-filled-prim-700">
                            Aktualisieren
                        </div>
                    </div>
                </div>

                <div className="h-divider"></div>

                <div className="row d-flex justify-sb align-c">
                    <span className="txt-subhead txt-500 c-txt">Summe Einzahlungen</span>
                    <span className="txt-subhead txt-700 c-succ-700">+ {summeEinzahlungen} €</span>
                </div>

                <div className="row d-flex justify-sb align-c">
                    <span className="txt-subhead txt-500 c-txt">Summe Auszahlungen</span>
                    {/* <span className="txt-title txt-700 c-danger-700">- {berechneSummeAuszahlungen(transaktionen).toFixed(2)} €</span> */}
                    <span className="txt-subhead txt-700 c-danger-700">- {summeAuszahlungen} €</span>
                </div>

                <div className="row d-flex justify-sb align-c">
                    <span className="txt-subhead txt-500 c-txt">Ausstehend</span>
                    <span className="txt-subhead txt-700 c-txt">- {summeAusstehend} €</span>
                </div>

                <div className="h-divider">

                </div>

                <div className="row d-flex justify-sb align-c">
                    <span className="txt-subhead txt-500 c-txt">Saldo</span>
                    <span className={`txt-subhead txt-700 c-txt ${saldo >= 0 ? 'c-succ-700' : 'c-danger-700'}`}>
                        {saldo > 0 ? '+' : ''} {saldo}€
                    </span>
                </div>
                {/* <h2>hello</h2>
                    <h2>sum ein {berechneSummeEinzahlungen(transaktionen)}</h2>
                    <h2>sum aus {berechneSummeAuszahlungen(transaktionen)}</h2>
                    <h2>sum ausstehend {berechneSummeAusstehend(transaktionen)}</h2> */}
            </div>
        </div>
    );
}