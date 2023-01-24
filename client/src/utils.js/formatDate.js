export default function FormatDate (date) {
    return new Date(parseInt(date))
    .toLocaleString('en-US', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true
    });
}