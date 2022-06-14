const { expectRevert, time } = require('@openzeppelin/test-helpers');
const MonToken = artifacts.require("Mon");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MonToken", function (accounts) {
  let token;
  before(async () => {
    token = await MonToken.deployed();
  });

  /**
   * Mint token
   */
  it("should mint token successfully", async function () {
    const receiver = '0x318c1980e654a4be9a463b84edd31d9ac1004626'
    const beforeBalance = await token.balanceOf(receiver);
    await token.faucet(receiver, 1000);
    const afterBalance = await token.balanceOf(receiver);

    assert((parseInt(afterBalance) - parseInt(beforeBalance)) == 1000);
  });

  it("should NOT mint token when address is null", async function () {
    const receiver = '0x0000000000000000000000000000000000000000'
    await expectRevert(
      token.faucet(receiver, 1000),
      'ERC20: cannot mint to address null'
    );
  });
});
