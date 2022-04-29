require('dotenv').config();
const port = process.env.HOST_PORT || 9090

module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: process.env.MAINNET_PK,
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: process.env.SHASTA_PK,
      userFeePercentage: 10,
      feeLimit: 1e10,               // max value is le10
      originEnergyLimit: 1e7,
      fullHost: 'https://api.shasta.trongrid.io',
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",
      network_id: '2'
    },
    nile: {
      privateKey: process.env.NILE_PK,
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.nileex.io',
      network_id: '3'
    },
    development: {
      // For trontools/quickstart docker image
      privateKey: process.env.LOCAL_PK,
      userFeePercentage: 0,
      feeLimit: 1000 * 1e6,
      fullHost: 'http://127.0.0.1:' + port,
      network_id: '4'
    },
    compilers: {
      solc: {
         version: '0.8.6'
         //version: '0.4.25'
        //  version: '0.4.24'
      }
    }
  },
  mocha: {
    enableTimeouts: false,
    before_timeout: 120000 // Here is 2min but can be whatever timeout is suitable for you.
  },
  contracts_directory: './src/contracts',
  // contracts_build_directory: './src/abi',
  // migrations_directory: './src/abi'   // when migrating
}
