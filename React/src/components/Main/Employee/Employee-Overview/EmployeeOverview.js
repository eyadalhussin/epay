import CustomerTable from "../components/CustomerTable";
import Transactionslnfo from "../components/Transactionslnfo";

export default function EmployeeOverview() {
    return(
        <div className="c-container d-flex f-direction-c f-gap-4 fade-in">
            <span className="txt-headline txt-500 c-txt">Übersicht</span>
            <Transactionslnfo />
            <CustomerTable />
        </div>

    )
}