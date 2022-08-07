require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle")


const ALCHEMY_API_KEY ="577ax2XByufEqJr2SNkUY67TNniYDay9";
const MATIC_PRIVATE_KEY = ""; //import account privet key here 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  networks: {
    matic:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${MATIC_PRIVATE_KEY}`],
    },
  }
};
