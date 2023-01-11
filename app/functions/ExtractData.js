

export default ExtractData = (data, base64) => {
    if(data.totalAmount.data !== undefined){
        data.totalAmount.data = data.totalAmount.data.toString();
    }
    if(data.taxAmount.data !== undefined){
        data.taxAmount.data = data.taxAmount.data.toString();
    }
    
    let receiptInformation = {
        "total_cost": data.totalAmount.data,
        "total_tax": data.taxAmount.data,
        "date": data.date.data,
        "location_name": data.merchantName.data,
        "location_address": data.merchantAddress.data,
        "items": {},
        "base64": base64
    };
    const items = data.amounts;
    let price = "";
    let itemAndQuantityStr = "";
    let itemNameStr = "";
    let quantity = "";
    const quantityRegex = /\d+/;
    const currencyUnits = ["£", "$", "€"];

    items.forEach((item, _) => {
        price = item.data.toString(); 
        // Often the price will not have decimal places as a price should.
        if(price.length == 1){ // Check now
        // Add decimal place
        price = price + ".";
        }
        while(price.length < 4){
        // Pad price with decimal places.
        // e.g 2. turns to 2.00, 2.0 into 2.00
        price = price + "0"
        }
        // Loop through every currency
        currencyUnits.forEach((unit, _) => {
        // If the item contains the currency unit and price
        if(item.text.includes(`${unit}${price}`)){
            // Remove the price from the item name
            itemAndQuantityStr = item.text.replace(`${unit}${price}`, "");
            // Grab the quantity from the item name
            quantity = itemAndQuantityStr.match(quantityRegex)
            // Now remove the quantity from item name
            itemNameStr = itemAndQuantityStr.replace(`${quantity}`, "");

            // Check if the quantity is a null value
            if(!Object.is(quantity, null) && quantity.length > 0){
            // Typically indicates this "item" has been read incorrectly by the OCR
            // It could be "Card" or "Total" money spent instead of a singular item.
            // Not null means it's OK to add
            receiptInformation.items[itemNameStr] = quantity[0];
            }
        }
        
        });

    });

    return receiptInformation;
}