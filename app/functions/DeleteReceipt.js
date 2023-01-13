/**
   * Delete a receipt from the SQLite database given the ID (primary key)
   * @param {Object}  db  Database to use 
   * @param {Integer} id  ID of the entry to delete
*/
export default async function DeleteReceipt ( {db, id}){
    db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM receipts WHERE id= ?`,
          [id], null, null
        );
      })
}