"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotal = exports.round = exports.percentageToAmount = void 0;
var percentageToAmount = function (num, percent) {
    return (num * percent) / 100;
};
exports.percentageToAmount = percentageToAmount;
var round = function (num, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 0; }
    var p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
};
exports.round = round;
var getBrutPrice = function (price, companySetting) {
    var percentageLabel = ["socialExpenses", "employersTax", "operatingCosts"];
    var cost = 0;
    percentageLabel.forEach(function (field) {
        cost += (companySetting[field] * price) / 100;
    });
    return cost + price;
};
var calculateMaterial = function (material, quantity, surcharge) {
    var price = material.itemPrice;
    var wastePercentage = material.quantity.svinn || 0;
    var totalToCount = material.quantity.quantityPerComponent +
        (material.quantity.quantityPerComponent * wastePercentage) / 100;
    // ((Totalt * mengde) + påslag) * pris
    var extra = surcharge.surchargeMaterials;
    var totalWithQuantity = totalToCount * quantity;
    var totalWithQuantityAndExtra = totalWithQuantity + (totalWithQuantity * extra) / 100;
    return totalWithQuantityAndExtra * price;
};
var calculateLabor = function (material, surcharge, companySetting, quantity) {
    var minPerComponent = material.time.minPerComponent;
    var minuteRate = material.subjectDoc.hourlyRate / 60;
    var extra = surcharge.surchargeWorks;
    var minuteBrutPrice = getBrutPrice(minuteRate, companySetting);
    var totalMinAndQuantity = minPerComponent * quantity;
    var totalMinAndQuantityAndExtra = totalMinAndQuantity + (0, exports.percentageToAmount)(totalMinAndQuantity, extra);
    return totalMinAndQuantityAndExtra * minuteBrutPrice;
};
var getTotal = function (material, quantity, surcharge, companySetting) {
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
exports.getTotal = getTotal;
