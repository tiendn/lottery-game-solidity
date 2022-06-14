// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./SafeMath.sol";
import "./IERC20.sol";

contract LotteryGame {
  using SafeMath for uint256;

  // address payable private token;
  IERC20 private token;
  address payable public dealer;
  uint8 public maxPlayer;
  mapping(uint => Game) public games;
  mapping(uint => mapping(address => Bet)) public bets;
  mapping(uint => address payable[]) public winners;
  uint public gameId;

  enum State {
    EMPTY,
    CREATED,
    PLAYING,
    CLOSED
  }

  struct Game {
    uint id;
    uint bet;
    State state;
    uint counter;
    address payable[] players;
  }

  struct Bet {
    bytes32 hash;
    uint value;
  }

  event WinnerTransfer(
      address indexed winner,
      uint256 value
  );

  event DealerTransfer(
      address indexed dealer,
      uint256 value
  );

  event StopGame(
    uint id,
    uint result
  );

  constructor(address payable _token, uint8 _maxPlayer) {
    maxPlayer = _maxPlayer;
    token = IERC20(_token);
    dealer = payable(msg.sender);
  }

  function getBalance() view public returns(uint){
    return token.balanceOf(address(this));
      // return address(this).balance;
  }

  function getGame(uint _gameId) 
    external 
    view 
    returns(uint, uint, address[] memory, State) {
      Game storage game = games[_gameId];
      require(game.state != State.EMPTY, 'game has not created yet!');
      address[] memory players = new address[](game.counter);
      for (uint i = 0; i < game.counter; i++) {
        players[i] = game.players[i];
      }
      return (
        game.id,
        game.bet,
        players,
        game.state
      );
    }

  function createGame(uint _bet) 
    external 
    onlyDealer() {
    uint _gameId = gameId >= 1 ? gameId -1 : 0;
    if (games[_gameId].state != State.EMPTY) {
      require(games[_gameId].state == State.CLOSED, 'current game must be closed.');
    }
    require(_bet > 0, 'Bet cost must be higer than 0');
    address payable[] memory players = new address payable[](0);
    Game memory _game = Game(
      gameId,
      _bet,
      State.CREATED, 
      0,
      players
    );
    games[gameId] = _game;
    gameId++;
  }


  function bet(uint _gameId, uint8 value, uint8 salt) 
    validatedGameId(_gameId)
    gameOnReady(_gameId) 
    payable
    external {
    Game storage game = games[_gameId];
    // require not dealer
    require(msg.sender != dealer, 'dealer cannot play the game');
    // Approval and balance > game.bet
    require(token.allowance(msg.sender, address(this)) >= game.bet, "Amount of token is not approved");
    // Not enough token sent for betting
    require(token.balanceOf(msg.sender) >= game.bet, 'Balance insuficient funds');
    // require betting value from 00 -> 99
    require(value <= 99, 'Betting number must from 0 to 99');
    // require bet one time.
    require(bets[_gameId][msg.sender].hash == 0, 'bet already made');
    // require max < 100
    require(game.counter < maxPlayer, 'max players');
    
    game.counter++;
    game.players.push(payable(msg.sender));
    if (game.state == State.CREATED){
      game.state = State.PLAYING;
    }
    bets[_gameId][msg.sender] = Bet(keccak256(abi.encodePacked(value, salt)), value);

    // Transfer money
    token.transferFrom(msg.sender, address(this), game.bet);
  }

  // stop the game
  function stopGame(uint _gameId) 
    validatedGameId(_gameId)
    gameOnReady(_gameId) 
    onlyDealer() 
    payable
    external {
    Game storage game = games[_gameId];
    
    // Close state
    game.state = State.CLOSED;
    // Get two character last in blockNumber
    uint result = block.number % 100;
    uint totalPrice = game.counter.mul(game.bet);
    // Find who pick the block number
    for(uint i = 0; i < game.players.length; i++) {
        address payable player = game.players[i];
        if(bets[_gameId][player].value == result) {
          winners[_gameId].push(player);
        }
      }

    emit StopGame(_gameId, result);
    if (totalPrice > 0) {
      _releaseMoney(_gameId, totalPrice);
    }
  }

  function _releaseMoney(uint _gameId, uint totalPrice) private {
    // Transfer money
    if (winners[_gameId].length == 0) {
      token.transfer(dealer, totalPrice);
      emit DealerTransfer(dealer, totalPrice);
    } 
    else {
      uint dealerProfit = totalPrice.div(10);
      uint winnerProfit = totalPrice.sub(dealerProfit);
      uint profitPerWinner = winnerProfit.div(winners[_gameId].length);

      token.transfer(dealer, dealerProfit);
      emit DealerTransfer(dealer, dealerProfit);
      for (uint i = 0; i < winners[_gameId].length; i++) {
        token.transfer(winners[_gameId][i], profitPerWinner);
        emit WinnerTransfer(winners[_gameId][i], profitPerWinner);
      }
    }
  }

  modifier validatedGameId(uint _gameId) {
    require(games[_gameId].state != State.EMPTY, 'This game have not created!');
    _;
  }

  modifier gameOnReady(uint _gameId) {
    State state = games[_gameId].state;
    require(state == State.CREATED || state == State.PLAYING, 'This game has closed!');
    _;
  }

  modifier onlyDealer() {
    require(msg.sender == dealer, 'only dealer authorized');
    _;
  }
}
