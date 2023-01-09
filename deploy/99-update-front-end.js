const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndProjectFile =
    "C:/Users/mtoma/Documents/Mateo/Proyectos/hardhat-nft-marketplace-frontend-moralis/constants/networkMapping.json"
const frontEndAbiFile =
    "C:/Users/mtoma/Documents/Mateo/Proyectos/hardhat-nft-marketplace-frontend-moralis/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("actualizando el front")
        await UpdateFrontEnd()
        await UpdateABI()
    }
}

async function UpdateFrontEnd() {
    const nftMarketplace = ethers.getContract("NftMarketplace")
    const chainId = network.config.chainId.toString()
    const contractAddress = JSON.parse(fs.readFileSync(frontEndProjectFile, "utf8"))

    if (chainId in contractAddress) {
        if (!contractAddress[chainId]["NftMarketplace"].includes(await nftMarketplace).address) {
            contractAddress[chainId]["NftMarketplace"].push((await nftMarketplace).address)
        } else {
            contractAddress[chainId] = { NftMarketplace: [(await nftMarketplace).address] }
        }
        fs.writeFileSync(frontEndProjectFile, JSON.stringify(contractAddress))
    }
}

async function UpdateABI() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    fs.writeFileSync(
        `${frontEndAbiFile}NftMarketplace.json`,
        nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    )

    const basicNft = await ethers.getContract("BasicNft")
    fs.writeFileSync(
        `${frontEndAbiFile}BasicNft.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    )
}

module.exports.tags = ["all", "frontend"]
