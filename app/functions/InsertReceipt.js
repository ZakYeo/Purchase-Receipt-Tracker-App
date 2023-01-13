/**
   * Insert a new receipt to the SQLite database
   * @param {Object}  db              Database to use 
   * @param {String} receiptName      Name of the receipt
   * @param {String} category         Category of the receipt
   * @param {String} totalCost        Cost of the receipt
   * @param {String} totalTax         Tax of the receipt
   * @param {String} locationName     Location name of the receipt
   * @param {String} locationAddress  Location address of the receipt
   * @param {String} userDate         Date of the receipt
   * @param {String} base64           Base64 of the image of the receipt
*/
export default async function InsertReceipt ( {db, receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64}){
    db.transaction(tx => {
        tx.executeSql(
          'insert into receipts (receipt_name, category, total_cost, total_tax, location_name, location_address, date, base64) values (?, ?, ?, ?, ?, ?, ?, ?)',
          [receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64]
        );
      })
}