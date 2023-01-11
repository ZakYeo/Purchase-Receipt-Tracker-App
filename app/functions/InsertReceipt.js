
export default async function InsertReceipt ( {db, receiptName, category, totalCost, totalTax, locationName, locationAddress, date, base64}){

    db.transaction(tx => {
        tx.executeSql(
          'insert into receipts (receipt_name, category, total_cost, total_tax, location_name, location_address, date, base64) values (?, ?, ?, ?, ?, ?, ?, ?)',
          [receiptName, category, totalCost, totalTax, locationName, locationAddress, date, base64]
        );
      })
    

}