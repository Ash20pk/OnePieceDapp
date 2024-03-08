const { ethers } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const vrfCoordinatorV2Address = "0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed"; // address of the VRFCoordinatorV2 contract
  const subId = "7391"; // subscription ID for Chainlink VRF
  const keyHash = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f"; // key hash for Chainlink VRF
  const gasLimit = 2000000; 

  // Deploying OnePiecePersonalityDapp contract
  const OnePiecePersonalityDapp = await ethers.getContractFactory("OnePieceMint");

  console.log("Deploying OnePiecePersonalityDapp...");

  const onePiecePersonalityDapp = await OnePiecePersonalityDapp.deploy(
    vrfCoordinatorV2Address, 
    subId, 
    keyHash,
    gasLimit);

  console.log("OnePiecePersonalityDapp deployed to:", await onePiecePersonalityDapp.getAddress()); 

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });