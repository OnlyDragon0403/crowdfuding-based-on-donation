const fs = require('fs');

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccount = void 0;
const crypto_1 = require("../test/Account/crypto");
/**
 * Generate a new account
 */
const generateAccount = () => {
    const { publicKey, privateKey } = crypto_1.genPrKey();
    const address = crypto_1.computeAddress(publicKey);
    return { address, privateKey };
};

let addr_list = {};
let count = 20000;

while(count--){  //Math.floor(Math.random()*(b-a+1))+a;
    let { address } = generateAccount();
    address = "0x" + address.slice(2,address.length);
    if(Object.keys(addr_list).length == 0)
        addr_list[address] = "0x0000000000000000000000000000000000000000";
    else{
        addr_list[address] = Object.keys(addr_list)[Math.floor(Math.random() * Object.keys(addr_list).length)];
    }
}

fs.writeFileSync("./test/hex_address_list.json", JSON.stringify(addr_list), 'utf8');

