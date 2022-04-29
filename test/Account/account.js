"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccount = void 0;
const crypto_1 = require("./crypto");
/**
 * Generate a new account
 */
const generateAccount = () => {
    const { publicKey, privateKey } = crypto_1.genPrKey();
    const addressBytes = crypto_1.computeAddress(publicKey);
    const address = crypto_1.getBase58CheckAddress(addressBytes);
    return { address, privateKey };
};
exports.generateAccount = generateAccount;
