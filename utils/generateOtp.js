function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
}
module.exports = {generateOTP}