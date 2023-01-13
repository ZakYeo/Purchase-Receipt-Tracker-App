/**
   * Edit/Update a receipt from the SQLite database
   * @param {Object}  db              Database to use 
   * @param {String} receiptName      Name of the receipt
   * @param {String} category         Category of the receipt
   * @param {String} totalCost        Cost of the receipt
   * @param {String} totalTax         Tax of the receipt
   * @param {String} locationName     Location name of the receipt
   * @param {String} locationAddress  Location address of the receipt
   * @param {String} userDate         Date of the receipt
   * @param {String} base64           Base64 of the image of the receipt
   * @param {String} id               ID of the receipt to edit (primary key)
*/
export default async function EditReceipt ( {
                                            db, receiptName, category, totalCost, totalTax, 
                                            locationName, locationAddress, userDate, base64, id
                                          }){
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE receipts SET receipt_name=?, category=?, total_cost=?, total_tax=?, location_name=?, location_address=?, date=?, base64=? WHERE id=?',
          [receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64, id]
        );
      })
}