function formattedDate(date){
    const utcDate = new Date(date);
    const timezoneOffset = 6 * 60 * 60 * 1000; // UTC+6 in milliseconds
    const customDate = new Date(utcDate.getTime() + timezoneOffset);
    const dateString = customDate.toISOString().split('T')[0];
    const finalDate = new Date(`${dateString}T00:00:00.000Z`);
    return finalDate.toISOString()
}

module.exports = {formattedDate}