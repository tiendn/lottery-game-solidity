const MonToken = artifacts.require("./contracts/Mon.sol");
const LotteryGame = artifacts.require("./contracts/LotteryGame.sol");

module.exports = async function(deployer) {
  await deployer.deploy(MonToken);
  const token = await MonToken.deployed();
  await deployer.deploy(LotteryGame, token.address, 100);
  await LotteryGame.deployed();
};
