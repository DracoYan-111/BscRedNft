import {ethers} from "hardhat";

async function main() {

    let tradContract = "";
    let nftName = "Red Imprint";
    let nftSymbol = "RI";

    const RedCollection = await ethers.getContractFactory("RedCollection");
    const redCollection = await RedCollection.deploy(tradContract, nftName, nftSymbol);
    await redCollection.deployed();

    console.log(`Transaction contract address ${tradContract} ,Collection name ${nftName} ,Collection abbreviation ${nftSymbol}`);
    console.log(`Collection contract deployed to ${redCollection.address}`);

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
