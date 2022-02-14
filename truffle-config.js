const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "/client/src/contracts"),
  compilers: {
    solc: {
      version: "^0.6.0", 
      settings: {
        optimizer: {
          enabled: true,
        },
      },
    }
  },
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 7545,
      network_id: "5777"
    },

    // matic: {
    //   provider: () => new HDWalletProvider(process.env.MNEMONIC, 
    //   `https://rpc-mumbai.matic.today`),
    //   network_id: 80001,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    //   gas: 6000000,
    //   gasPrice: 10000000000,
    // },
  }
};
