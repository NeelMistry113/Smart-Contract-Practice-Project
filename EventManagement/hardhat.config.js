require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "";
const RINKEBY_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.9",

  network: {
    rinkeby:{
      url: ``,
      account: "",
    },
  }
};
