import { useEffect, useState } from "react";
import CustomerActivity from "./CustomerActivity/CustomerActivity";
import { sortByBetragASC, sortByBetragDESC, sortByDateASC, sortByDateDESC } from "../../../../../functions/sort";

export default function CustomerActivities(props) {
    const transaktionen = props.transaktionen;

    const [sortedTransaktionen, setSortedTransaktionen] = useState([]);
    const [sortMenu, setSortMenu] = useState(false);
    const [sortMenuValue, setSortMenuValue] = useState('Date DESC');


    useEffect(() => {
        // const sorted = sortByDateDESC(transaktionen);
        // setSortedTransaktionen(sorted);
        let sorted;
        switch (sortMenuValue) {
            case 'Date DESC':
                sorted = sortByDateDESC(transaktionen);
                break;
            case 'Date ASC':
                sorted = sortByDateASC(transaktionen);
                break;
            case 'Betrag DESC':
                sorted = sortByBetragDESC(transaktionen);
                break;
            case 'Betrag ASC':
                sorted = sortByBetragASC(transaktionen);
                break;
            default:
                sorted = transaktionen; // Default to original order
        }
        setSortedTransaktionen(sorted);
    }, [transaktionen, sortMenuValue]);


    return (
        <div>
            <div className="row d-flex justify-sb align-c m-t-2">
                <span className="txt-title txt-500 c-txt">Letzte Aktivitäten</span>
                <div className="d-flex align-c f-gap-2">
                    <span className="txt-subhead txt-500 c-txt">Sortieren nach </span>
                    <div className={`dd-cont ${sortMenu ? 'active' : ''}`} onClick={() => setSortMenu(!sortMenu)}>

                        <span className="value">{sortMenuValue.split(' ')[0]}</span>

                        {sortMenuValue.includes('DESC') ?
                            <span className="material-symbols-outlined c-succ-700 txt-title">arrow_downward_alt</span>
                            :
                            <span className="material-symbols-outlined c-danger-700 txt-title">arrow_upward_alt</span>
                        }

                        <div className="options">
                            {/* Sort Date DESC */}
                            <div className="option" onClick={() => setSortMenuValue('Date DESC')}>
                                <span>Date</span>
                                <span className="material-symbols-outlined c-succ-700 txt-title">arrow_downward_alt</span>
                            </div>

                            {/* Sort Betrag DESC */}
                            <div className="option" onClick={() => setSortMenuValue('Betrag DESC')}>
                                <span>Betrag</span>
                                <span className="material-symbols-outlined c-succ-700 txt-title">arrow_downward_alt</span>
                            </div>

                            {/* Sort Date DESC */}
                            <div className="option" onClick={() => setSortMenuValue('Date ASC')}>
                                <span>Date</span>
                                <span className="material-symbols-outlined c-danger-700 txt-title">arrow_upward_alt</span>
                            </div>

                            {/* Sort Betrag DESC */}
                            <div className="option" onClick={() => setSortMenuValue('Betrag ASC')}>
                                <span>Betrag</span>
                                <span className="material-symbols-outlined c-danger-700 txt-title">arrow_upward_alt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Customer Activities */}
            <div className="col-xs-12 elevation-light-1 d-flex f-direction-c f-gap-1 border-r-1 p-v-1 m-v-2">
                {/* Table Head */}
                <div className="row max-height no-scroll">
                    <div className="col-xs-3 d-flex justify-c align-c">
                        <span className="txt-subhead txt-500 c-txt">Datum</span>
                    </div>
                    <div className="col-xs-3 d-flex justify-c align-c">
                        <span className="txt-subhead txt-500 c-txt">Uhrzeit</span>
                    </div>
                    <div className="col-xs-2 d-flex justify-c align-c">
                        <span className="txt-subhead txt-500 c-txt">Status</span>
                    </div>
                    <div className="col-xs-4 d-flex justify-c align-c">
                        <span className="txt-subhead txt-500 c-txt">Betrag</span>
                    </div>
                </div>

                <div className="row d-flex justify-c align-c">
                    <div className="h-divider"></div>
                </div>

                <div className="max-height">
                    {sortedTransaktionen.map(element => (
                        <CustomerActivity key={element.transaktion_id} activity={element} />
                    ))}
                </div>
            </div>
        </div>
    );
}