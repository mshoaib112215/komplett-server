"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentageToAmount = (num, percent) => {
    return (num * percent) / 100;
};
exports.round = (num, decimalPlaces = 0) => {
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
};
const getBrutPrice = (price, companySetting) => {
    const percentageLabel = ["socialExpenses", "employersTax", "operatingCosts"];
    let cost = 0;
    percentageLabel.forEach((field) => {
        cost += (companySetting[field] * price) / 100;
    });
    return cost + price;
};
const calculateMaterial = (material, quantity, surcharge) => {
    const price = material.itemPrice;
    const wastePercentage = material.quantity.svinn || 0;
    const totalToCount = material.quantity.quantityPerComponent +
        (material.quantity.quantityPerComponent * wastePercentage) / 100;
    // ((Totalt * mengde) + påslag) * pris
    const extra = surcharge.surchargeMaterials;
    const totalWithQuantity = totalToCount * quantity;
    const totalWithQuantityAndExtra = totalWithQuantity + (totalWithQuantity * extra) / 100;
    return totalWithQuantityAndExtra * price;
};
const calculateLabor = (material, surcharge, companySetting, quantity) => {
    const minPerComponent = material.time.minPerComponent;
    const minuteRate = material.subjectDoc.hourlyRate / 60;
    const extra = surcharge.surchargeWorks;
    const minuteBrutPrice = getBrutPrice(minuteRate, companySetting);
    const totalMinAndQuantity = minPerComponent * quantity;
    const totalMinAndQuantityAndExtra = totalMinAndQuantity + exports.percentageToAmount(totalMinAndQuantity, extra);
    return totalMinAndQuantityAndExtra * minuteBrutPrice;
};
exports.getTotal = (material, quantity, surcharge, companySetting) => {
    // console.log("-------");
    // if(!material.quantity.quantityPerComponent || !material.quantity.svinn) {
    //   console.log("material: ", material.application);
    // }
    // console.log("material: ", material.application);
    // console.log("quantity: ", material.quantity);
    // console.log(
    //   "labor:",
    //   calculateLabor(material, surcharge, companySetting, quantity)
    // );
    // console.log("material:", calculateMaterial(material, quantity, surcharge));
    return (calculateLabor(material, surcharge, companySetting, quantity) +
        calculateMaterial(material, quantity, surcharge));
};
