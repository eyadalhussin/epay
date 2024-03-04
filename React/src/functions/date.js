export const convertToDate = (dateString) => {
    const parts = dateString.split('.');

    return new Date(parts[2], parts[1] - 1, parts[0]);
}

export const converStringToDate = (dateString) => {
    const [jahr, monat, tag] = dateString.split('-');
    return new Date(parseInt(jahr), parseInt(monat) - 1, parseInt(tag));
}