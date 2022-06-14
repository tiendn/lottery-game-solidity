const { expectRevert, time } = require('@openzeppelin/test-helpers');
const LotteryGame = artifacts.require("LotteryGame");
const MonToken = artifacts.require("Mon");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("LotteryGame", function (accounts) {
  const dealer = accounts[0];
  let token;
  let lotteryGame;
  before(async () => {
    // deploy one time
    token = await MonToken.deployed();
    lotteryGame = await LotteryGame.new(token.address, 2);
  });

  /**
   * Create Game
   */

  it("should NOT create game when sender not dealer", async function () {
    await expectRevert(
      lotteryGame.createGame(20, {from: accounts[1]}),
      'only dealer authorized'
    );
  });

  it("should NOT create game when bet = 0", async function () {
    await expectRevert(
      lotteryGame.createGame(0),
      'Bet cost must be higer than 0'
    );
  });

  it("should create game successfully", async function () {
    const gameId = 0;
    const bet = 20;
    await lotteryGame.createGame(bet, {from: dealer});
    const game = await lotteryGame.getGame(gameId);
    
    assert(parseInt(game[0]) == gameId);
    assert(parseInt(game[1]) == bet);
  });

  it("should NOT create game when current game hasn't closed", async function () {
    await expectRevert(
      lotteryGame.createGame(20, {from: dealer}),
      'current game must be closed.'
    );
  });

  /**
   * Bet Game
   */

  it("should NOT bet when user is dealer", async function () {
    await expectRevert(
      lotteryGame.bet(0, 12, 2, {from: dealer}),
      'dealer cannot play the game'
    );
  });

  /**
   * Close game 0
   */
   it("should close game successfully", async function () {
    const gameId = 0;
    await lotteryGame.stopGame(gameId, {from: dealer});
    const game = await lotteryGame.getGame(gameId);

    assert(parseInt(game[0]) == gameId);
    assert(parseInt(game[3]) == 3);
  });

  /**
   * Bet Game
   */


  it("should NOT bet when game state not ready", async function () {
    await expectRevert(
          lotteryGame.bet(0, 12, 2, {from: accounts[1]}),
          'This game has closed!'
        );
  });

  it("should NOT bet when game have not created yet", async function () {
    await expectRevert(
      lotteryGame.bet(1, 12, 2, {from: accounts[1]}),
      'This game have not created!'
    );
  });


  it("should NOT bet when user not approve enough allowance token", async function () {
    await lotteryGame.createGame(20, {from: dealer});
    await expectRevert(
      lotteryGame.bet(1, 12, 2, {from: accounts[1]}),
      'Amount of token is not approved'
    );
  });

  it("should NOT bet when user balance insuficient funds", async function () {
    await token.approve(lotteryGame.address, 1000, {from: accounts[1]});
    
    await expectRevert(
      lotteryGame.bet(1, 12, 2, {from: accounts[1]}),
      'Balance insuficient funds'
    );
  });

  it("should NOT bet when user vote value outside value from 0 to 99", async function () {
    await token.faucet(accounts[1], 100);
    await expectRevert(
      lotteryGame.bet(1, 122, 2, {from: accounts[1]}),
      'Betting number must from 0 to 99'
    );
  });

  it("should NOT bet when max players reached", async function () {
    await token.faucet(accounts[2], 100);
    await token.faucet(accounts[3], 100);
    await token.approve(lotteryGame.address, 1000, {from: accounts[2]});
    await token.approve(lotteryGame.address, 1000, {from: accounts[3]});
    await lotteryGame.bet(1, 12, 2, {from: accounts[1]});
    await lotteryGame.bet(1, 32, 2, {from: accounts[2]});

    await expectRevert(
      lotteryGame.bet(1, 2, 2, {from: accounts[3]}),
      'max players'
    );
  });

  it("should NOT bet when user has bet before", async function () {
    const promises = [
      lotteryGame.bet(1, 12, 2, {from: accounts[1]}),
    ]
    await expectRevert(
      Promise.all(promises),
      'bet already made'
    );
  });


  // it("should bet successfully", async function () {
  //   const promises = [
  //     token.faucet(accounts[1], 100),
  //     lotteryGame.bet(1, 122, 2, {from: accounts[1]}),
  //   ]
  // });

  // /**
  //  * Close Game
  //  */

  it("should NOT close game when game state has closed", async function () {
    await expectRevert(
      lotteryGame.stopGame(0, {from: dealer}),
      'This game has closed!'
    );
  });

  it("should NOT close when game have not created yet", async function () {
    await expectRevert(
      lotteryGame.stopGame(2, {from: dealer}),
      'This game have not created!'
    );
  });

  it("should NOT close game when user is player", async function () {
    await expectRevert(
      lotteryGame.stopGame(1, {from: accounts[1]}),
      'only dealer authorized'
    );
  });

  it("should stop successfully", async function () {
    const beforeContractBalance = await token.balanceOf(lotteryGame.address);
    const gameId = 1;
    await lotteryGame.stopGame(gameId, {from: dealer});
    const game = await lotteryGame.getGame(gameId);

    assert(parseInt(game[0]) == gameId);
    assert(parseInt(game[3]) == 3);

    const afterContractBalance = await token.balanceOf(lotteryGame.address);
    assert(parseInt(beforeContractBalance) - parseInt(afterContractBalance) == (game[2].length * parseInt(game[1]) ))
  });
});
