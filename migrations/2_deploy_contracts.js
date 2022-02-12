var crowdFunding = artifacts.require("./crowdFunding.sol");
var fundingBank = artifacts.require("./fundingBank.sol");

module.exports = async function(deployer, accounts) {
  await deployer.deploy(fundingBank);
  const fundingBankInstance = await fundingBank.deployed();

  await deployer.deploy(crowdFunding, fundingBankInstance.address);
  const crowdFundingInstance = await crowdFunding.deployed();
};
