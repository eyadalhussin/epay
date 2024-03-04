import './CustomerActivity.scss';

export default function CustomerActivity(props) {
    const activity = props.activity;

    return (
        <div className="activity">
            {/* Table */}
            < div className="row p-v-1 d-flex justify-sb align-c" >
                {/* Date */}
                <div className="col-xs-3 d-flex justify-c align-c d-flex f-direction-c" >
                    <div className="row justify-c align-c">
                        <span className="txt-body txt-600 c-txt">{activity.datum}</span>
                    </div>
                </div>
                {/* //Date */}

                {/* Icon */}
                <div className="col-xs-3 d-flex justify-c align-c d-flex f-direction-c">
                    <div className="row justify-c align-c">
                        <span className="txt-body txt-600 c-txt">{activity.time}</span>
                    </div>
                </div>
                {/* //Icon */}

                {/* Status */}
                <div className="col-xs-2 d-flex justify-c align-c d-flex f-direction-c">
                    <div className="row justify-c align-c">
                        <div className={`icon-container bg-succ-700 ${activity.status == 'BESTAETIGT' ? 'bg-succ-700' : 'bg-warn-300'}`}>
                            <span className="material-symbols-outlined txt-subhead txt-500 c-white-500">{activity.status == 'BESTAETIGT' ? 'check' : 'exclamation'}</span>
                        </div>
                    </div>
                </div>
                {/* //Status */}

                {/* Amount */}
                <div className="col-xs-4 d-flex justify-c align-c d-flex f-direction-c">
                    <div className="row justify-c align-c">
                        <span className={`txt-body txt-600 ${activity.transaktionstyp == 'EINZAHLUNG' ? 'c-succ-700' : 'c-danger-700'} `}>{activity.transaktionstyp == 'EINZAHLUNG' ? '+' : '-'} {activity.betrag.toFixed(2)}€</span>
                    </div>
                </div>
                {/* //Amount */}
            </div >
            {/* Table */}
        </div>
    );
}