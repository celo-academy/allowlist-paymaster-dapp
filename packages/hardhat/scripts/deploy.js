// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const Paymaster = await hre.ethers.getContractFactory("AllowlistPaymaster");
    const [deployer] = await hre.ethers.getSigners();
    const ENTRYPONT_ADDRESS = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";
    const paymaster = await Paymaster.deploy(
        ENTRYPONT_ADDRESS,
        deployer.address // Address of the owner of the paymaster
    );

    await paymaster.deployed();

    console.log(`Paymaster deployed: ${paymaster.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
