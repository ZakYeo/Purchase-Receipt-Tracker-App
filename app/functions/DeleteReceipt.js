
export default async function DeleteReceipt ( {db, id}){

    db.transaction(tx => {

        tx.executeSql(
          `DELETE FROM receipts WHERE id= ?`,
          [id], null, null
        );
      })

}