const TronWeb = require('tronweb')
var request = require("request");

export const TESTNET = 'shasta';
export const MAINNET = 'mainnet';
export const TRONLINK_INITIALISATION_WAIT_TIME = 500;
export const TRONWEB_INITIALISED = 'TRONWEB_INITIALISED';
export const TRONWEB_NOT_FOUND = 'TRONWEB_NOT_FOUND';
import jsonCompanyModel from './abis/Main.json';
const TRONGRID_SHASTA_API = 'https://api.shasta.trongrid.io';

export default {
    inventoryScAddress: {
        [TESTNET]: jsonCompanyModel.networks[2].address,
        [MAINNET]: "TT7awWuV3ohc7PnMdQPkvQY3PgDUCkLo9P"
    }
};

// var options = { method: 'POST',
// url: 'https://api.trongrid.io/wallet/createtransaction',
// headers: {
//     'TRON-PRO-API-KEY': 'e05a24d6-aa0a-49e0-a975-c843e492b9a0',
//     'Content-Type': 'application/json'
// },
// body: {
//     to_address: '41e9d79cc47518930bc322d9bf7cddd260a0260a8d',
//     owner_address: '41D1E7A6BC354106CB410E65FF8B181C600FF14292',
//     amount: 1000
// },
// json: true
// };

export async function loadTronweb() {

    // request(options, function (error, response, body) {
    // if (error) throw new Error(error);
    //     console.log(body);
    // });

    let tronweb = window.tronWeb;

    console.log("should reset tronweb");
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider(TRONGRID_SHASTA_API);
    const solidityNode = new HttpProvider(TRONGRID_SHASTA_API);
    const eventServer = new HttpProvider(TRONGRID_SHASTA_API);
    const adminPrivKey = "fd3d4e668c5e0fe21acbad1cd76ca72de5f0acd814d8923e4f99b80fa869dd84";

    tronweb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer
    );
    tronweb.setPrivateKey(adminPrivKey);

    // tronweb.setAddress('TFxodnMj2vrBisz2155zXdR2JqkM2XAZk2');

    // tronweb.setHeader({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Headers': '*',
    //         'Access-Control-Allow-Origin': '*',
    //         'TRON-PRO-API-KEY': 'e05a24d6-aa0a-49e0-a975-c843e492b9a0'
    // });

    window.tronWeb = tronweb;
}

