require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");


const dotenv = require("dotenv");
dotenv.config();

function privateKey() {
  return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
}

module.exports = {
  networks: {
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      accounts: privateKey(),
    },
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: privateKey(),
    },
    mantle_goerli: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: privateKey(),
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },  etherscan: {
    apiKey: "S1VXKDQCP4P2VXAK9Q8B46K71TFP9WF692",
  },
};