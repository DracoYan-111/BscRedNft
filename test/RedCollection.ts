import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("RedCollection", function () {
    // 定义了一个夹具以在每个测试中重用相同的设置。
    // 我们使用 loadFixture 运行这个设置一次，快照那个状态，
    // 并在每次测试中将 Hardhat Network 重置为该快照。
    async function deployRedCollection() {
        // Contracts are deployed using the first signer/account by default  默认情况下使用第一个签名者帐户部署合约
        const [owner, otherAccount] = await ethers.getSigners();

        let tradContract = "";
        let nftName = "Red Imprint";
        let nftSymbol = "RI";

        const RedCollection = await ethers.getContractFactory("RedCollection");
        const redCollection = await RedCollection.deploy(tradContract, nftName, nftSymbol);
        await redCollection.deployed();

        console.log(`Transaction contract address ${tradContract} ,Collection name ${nftName} ,Collection abbreviation ${nftSymbol}`);
        console.log(`Collection contract deployed to ${redCollection.address}`);

        return {redCollection, tradContract, nftName, nftSymbol, owner, otherAccount};
    }


    describe("Deployment", function () {
        /// TODO After deployment, check that the transaction contract address cannot be the owner's address
        it("Should set the right tradContract,cannot be owner", async function () {
            const {redCollection, owner} = await loadFixture(deployRedCollection);

            expect(await redCollection.tradContract() == owner.address);
        });

        /// TODO After deployment, check that the contract owner must be the transaction initiator
        it("Should set the right owner", async function () {
            const {redCollection, owner} = await loadFixture(deployRedCollection);

            expect(await redCollection.owner() === owner.address);
        });

        /// TODO After deployment, check if the contract owner can call
        it("Should only be available to the contract owner", async function () {
            const {redCollection} = await loadFixture(deployRedCollection);

            //expect(await redCollection.foundryCollectibles("ipfsURI"));
        });
    });

    /*   describe("Withdrawals", function () {
           describe("Validations", function () {
               it("Should revert with the right error if called too soon", async function () {
                   const {lock} = await loadFixture(deployOneYearLockFixture);

                   await expect(lock.withdraw()).to.be.revertedWith(
                       "You can't withdraw yet"
                   );
               });

               it("Should revert with the right error if called from another account", async function () {
                   const {lock, unlockTime, otherAccount} = await loadFixture(
                       deployOneYearLockFixture
                   );

                   // We can increase the time in Hardhat Network
                   await time.increaseTo(unlockTime);

                   // We use lock.connect() to send a transaction from another account
                   await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
                       "You aren't the owner"
                   );
               });

               it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
                   const {lock, unlockTime} = await loadFixture(
                       deployOneYearLockFixture
                   );

                   // Transactions are sent using the first signer by default
                   await time.increaseTo(unlockTime);

                   await expect(lock.withdraw()).not.to.be.reverted;
               });
           });

           describe("Events", function () {
               it("Should emit an event on withdrawals", async function () {
                   const {lock, unlockTime, lockedAmount} = await loadFixture(
                       deployOneYearLockFixture
                   );

                   await time.increaseTo(unlockTime);

                   await expect(lock.withdraw())
                       .to.emit(lock, "Withdrawal")
                       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
               });
           });

           describe("Transfers", function () {
               it("Should transfer the funds to the owner", async function () {
                   const {lock, unlockTime, lockedAmount, owner} = await loadFixture(
                       deployOneYearLockFixture
                   );

                   await time.increaseTo(unlockTime);

                   await expect(lock.withdraw()).to.changeEtherBalances(
                       [owner, lock],
                       [lockedAmount, -lockedAmount]
                   );
               });
           });
       });*/
});
