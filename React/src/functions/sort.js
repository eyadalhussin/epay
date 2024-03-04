import { convertToDate } from "./date";

export const sortByKontostand = (list, sortDirection) => {
    const sorted = [...list].sort((a, b) => {
        if (sortDirection === 'ASC') {
            return a.konto.kontostand - b.konto.kontostand;
        } else {
            return b.konto.kontostand - a.konto.kontostand;
        }
    });
    return sorted;
}

export const sortByBetragDESC = (list) => {
    const sorted = [...list].sort((a, b) => {
        return b.betrag - a.betrag;
    });
    return sorted;
}

export const sortByBetragASC = (list) => {
    const sorted = [...list].sort((a, b) => {
        return a.betrag - b.betrag;
    });
    return sorted;
}

export const sortByDateASC = (list) => {
    const sorted = [...list].sort((a, b) => {
        const aDate = convertToDate(a.datum);
        const bDate = convertToDate(b.datum);
        return aDate - bDate;
    })
    return sorted;
}

// export const sortByDateDESC = (list) => {
//     const sorted = [...list].sort((a, b) => {
//         const aDate = convertToDate(a.datum);
//         const bDate = convertToDate(b.datum);
//         return bDate - aDate;
//     })
//     return sorted;
// }

export const sortByDateDESC = (list) => {
    console.log("Sorting by Date and Time")
    const sorted = [...list].sort((a, b) => {
        const aDateTime = convertToDateTime(a.datum, a.time);
        const bDateTime = convertToDateTime(b.datum, b.time);

        return bDateTime - aDateTime;
    });
    return sorted;
}

function convertToDateTime(datum, time) {
    const [day, month, year] = datum.split(".");
    const [hour, minute] = time.split(":");

    return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
}
