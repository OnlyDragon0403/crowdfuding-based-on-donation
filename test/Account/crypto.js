"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.getBase58CheckAddress = exports.computeAddress = exports.genPrKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const js_sha3_1 = require("js-sha3");
const base58_1 = require("./base58");
const ADDRESS_PREFIX = '41';
const genPrKey = () => {
    const ecdh = crypto_1.default.createECDH('secp256k1');
    ecdh.generateKeys();
    return { publicKey: ecdh.getPublicKey('hex'), privateKey: ecdh.getPrivateKey('hex') };
};
exports.genPrKey = genPrKey;
const computeAddress = (publicKey) => {
    let pubBytes = [...Buffer.from(publicKey, 'hex')];
    if (pubBytes.length === 65)
        pubBytes = pubBytes.slice(1);
    const hash = js_sha3_1.keccak_256(pubBytes);
    let addressHex = hash.substring(24);
    addressHex = ADDRESS_PREFIX + addressHex;
    return addressHex;
};
exports.computeAddress = computeAddress;
const getBase58CheckAddress = (address) => {
    const hash = exports.sha256(exports.sha256(address));
    const checkSum = hash.substr(0, 8);
    const fullAddress = Buffer.from(address + checkSum, 'hex');
    return base58_1.encode58(fullAddress);
};
exports.getBase58CheckAddress = getBase58CheckAddress;
const sha256 = (msg) => crypto_1.default.createHash('sha256').update(Buffer.from(msg, 'hex')).digest('hex');
exports.sha256 = sha256;
