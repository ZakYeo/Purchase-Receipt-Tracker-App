
export default async function EditReceipt ( {db, receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64, id}){

    db.transaction(tx => {
        tx.executeSql(
          'UPDATE receipts SET receipt_name=?, category=?, total_cost=?, total_tax=?, location_name=?, location_address=?, date=?, base64=? WHERE id=?',
          [receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64, id]
        );
      })
}