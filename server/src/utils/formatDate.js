const FormatDate = (date) => {
    return new Date(parseInt(date))
    .toLocaleString('en-US', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true
    });
    // return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes();
}

module.exports = FormatDate;