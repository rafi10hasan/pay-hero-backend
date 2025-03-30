function generateTxnId() {
  const timestamp = Date.now(); 
  const randomNum = Math.floor(1000 + Math.random() * 9000); 
  return `txn-${randomNum}-${timestamp}`;
}

module.exports = {generateTxnId};
