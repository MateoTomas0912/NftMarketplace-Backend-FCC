const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const PRICE = ethers.utils.parseEther("0.1")

async function mint() {
    const basicNft = await ethers.getContract("BasicNft")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)

    if (network.config.chainId == 31337) {
        await moveBlocks(2, 1000)
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
