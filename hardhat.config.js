require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "d1b60d5b5253441084e99c2d971e693f"
//const projectId = "4fa55521d0f647f28c1a179e85f454da"

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    // hardhat:{
    //   chainId: 1337
    // },
    ropsten: {
      url: `https://ropsten.infura.io/v3/d1b60d5b5253441084e99c2d971e693f`,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
