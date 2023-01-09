const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verifiy } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let args = []

    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    /*
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verify")
        await verifiy(nftMarketplace.address, args)
    }*/
}

module.exports.tags = ["all", "nftmarketplace"]
