function formatime( date ){
    const year = date.getFullYear();
    const mounth = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    return [year,mounth,day].map(formaNum).join("-")+" "+[hour,minutes,second].map(formaNum).join(":");
}
const formaNum = n => {
    n = n.toString();
    return n[1]?n:'0'+n;
}
module.exports = formatime; 