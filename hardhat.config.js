require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
networks: {
  arbitrumSepolia: {
    url: "https://sepolia-rollup.arbitrum.io/rpc",
    accounts: [process.env.PRIVATE_KEY]
  }
}
};