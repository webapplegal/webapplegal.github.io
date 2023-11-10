export function getSeparatedDate(){

    let date = String(new Date()).substring(4,24);

    let months = {};
    months.Jan="01";
    months.Feb="02";
    months.Mar="03";
    months.Apr="04";
    months.May="05";
    months.Jun="06";
    months.Jul="07";
    months.Aug="08";
    months.Sep="09";
    months.Oct="10";
    months.Nov="11";
    months.Dic="12";

    let formatedDate = {};
    formatedDate.month = months[date.substring(0,3)];
    formatedDate.day = date.substring(4,6);
    formatedDate.year = date.substring(9,11);
    formatedDate.hour = date.substring(12,14);
    formatedDate.minute = date.substring(15,17);
    formatedDate.second = date.substring(19,20);
    formatedDate.serial = formatedDate.year+formatedDate.month+formatedDate.day+formatedDate.hour+formatedDate.minute+formatedDate.second;
    console.log("Year:",formatedDate.year)
    console.log("Month:",formatedDate.month)
    console.log("Day:",formatedDate.day)
    return formatedDate
}
