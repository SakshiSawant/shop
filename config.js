export const nftaddress = '0x71eF00885AE73b28caBC60E62050A405fc27caeF'; 
export const nftmarketaddress = '0x47C78B115c0FEa7A8B8378c46Ee74538AE250043' ;
export const causeaddress = '0x337C851947A9f91CCa4F8f304b3bE8dA6117A124';
export const allcausesaddress = '0x9379e2e26FE9B63f5f9643ceF9b15070146213aD';

// Deployed to ropsten network
// NFTMarket deployed to: 0x47C78B115c0FEa7A8B8378c46Ee74538AE250043
// NFT deployed to: 0x71eF00885AE73b28caBC60E62050A405fc27caeF
// AllCause Cause deployed to: 0x9379e2e26FE9B63f5f9643ceF9b15070146213aD
// Cause deployed to: 0x337C851947A9f91CCa4F8f304b3bE8dA6117A124
//EDIT !!!
let x = 2;
//change the above everytime you redeploy your contracts

//command for deploying your contracts on hardhat:
// npx hardhat run --network localhost scripts/deploy.js

//1. To install all dependencies: (terminal 1)
//npm install

//* Command for compiling contracts (on another terminal)
//npx hardhat compile

// IMP: 2. command for starting or restarting your server: (terminal 2, keep running)
//npx hardhat node
//Account and private keys will be provided, import localhost:8545 metamask account with same

//3. (terminal 3)
//npx hardhat run scripts/deploy.js --network localhost
//Copy following things in above file
//NFT = nftaddress
//NFTMarket = nftmarketaddress

//IMP : 4. To start frontend (terminal 4, keep running)
//npm run dev

