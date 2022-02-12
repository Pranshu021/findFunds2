const { isTypedArray } = require("util/types");
const CrowdFunding = require("./crowdFunding.sol");
const FundingBank = require("./fundingBank.sol");

contract("crowdFunding", accounts => {
    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }

    before(async () => {
        crowdFunding = await CrowdFunding.new();
        fundingBank = await FundingBank.new();
    })

    it("should have total funds ", async() => {
        const 
    })
})