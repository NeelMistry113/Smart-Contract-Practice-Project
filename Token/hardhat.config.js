/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY ="U9umYJFq_pfQymaYE39hgNlf0w3wva0D";
const RINKEBY_PRIVATE_KEY ="";
module.exports = {
  solidity: "0.8.9",

  network: {
    rinkeby:{
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  }
};
