import React, { useEffect, useState } from "react";
import LotteryGame from "./contracts/LotteryGame.json";
import MonToken from "./contracts/Mon.json";
import { getWeb3 } from "./getWeb3";

function App() {
	const [web3, setWeb3] = useState(undefined);
	const [accounts, setAccounts] = useState([]);
	const [lotteryContract, setGameContract] = useState(undefined);
	const [tokenContract, setTokenContract] = useState(undefined);
	const [allowance, setAllowance] = useState(0);
	const [dealer, setDealer] = useState(undefined);
	const [game, setGame] = useState();

	useEffect(() => {
		const init = async () => {
			const web3 = await getWeb3();
			const accounts = await web3.eth.getAccounts();
			// const networkId = await web3.eth.net.getId();
			
			// const deployedNetworkLotteryGame = LotteryGame.networks[networkId];
			// const deployedNetworkLotteryGameERC20Token = MonToken.networks[networkId];

			const tokenContract = new web3.eth.Contract(
				MonToken,
				'0x9c8a4059b40d19fcd09370db2fb81c8ae94c2dfb'
				// deployedNetworkLotteryGameERC20Token && deployedNetworkLotteryGameERC20Token.address
			);
			
			const lotteryContract = new web3.eth.Contract(
				LotteryGame,
				'0xce0ec13cdbeb3e612bb5550aca4d248345185992'
			);
			
			console.log('address', lotteryContract)

			const _dealer = await lotteryContract.methods.dealer().call();
			// console.log('aaaa', await tokenContract.methods.balanceOf('0xce0ec13cdbeb3e612bb5550aca4d248345185992').call())
			// console.log('aaaa', await tokenContract.methods.balanceOf(tokenContract._address).call())

			setWeb3(web3);
			setTokenContract(tokenContract);
			setAccounts(accounts);
			setGameContract(lotteryContract);
			setDealer(_dealer);
		};
		init();
		window.ethereum.on("accountsChanged", (accounts) => {
			setAccounts(accounts);
		});
	}, []);

	const isReady = () => {
		return (
			typeof lotteryContract !== "undefined" &&
			typeof web3 !== "undefined" &&
			typeof accounts !== "undefined"
		);
	};

	useEffect(() => {
		if (isReady()) {
			updateGame();
			checkAllowence();
		}
	}, [accounts]);

	async function updateGame() {
		try {
			let gameId = parseInt(await lotteryContract.methods.gameId().call());
			gameId = gameId > 0 ? gameId - 1 : gameId;

			const game = await lotteryContract.methods.getGame(gameId).call();
			console.log(game);
			setGame({
				id: game[0],
				bet: game[1],
				players: game[2],
				state: game[3],
			});
		} catch (err) {
			console.log(err.message);
		}
	}

	const checkAllowence = async () => {
		try {
			const allowance = await tokenContract.methods.allowance(accounts[0], lotteryContract._address).call();
			setAllowance(allowance);
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const makeApprove = async (value) => {
		try {
			await tokenContract.methods.approve(value).send({ from: accounts[0] });
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const createGame = async (e) => {
		e.preventDefault();
		try {
			const betValue = e.target.elements[0].value;
			await lotteryContract.methods.createGame(betValue).send({ from: accounts[0] });
			await updateGame();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const mintToken = async (e) => {
		e.preventDefault();
		if (!tokenContract) return;

		const address = e.target.elements[0].value;
		try {
			await tokenContract.methods.faucet(address, 10000).send({from: accounts[0]})
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	}

	const bet = async (e) => {
		e.preventDefault();
		if (!game) return;

		const betValue = e.target.elements[0].value;
		try {
			if (allowance < game.bet) {
				const approve = await makeApprove(game.bet);
				if (!approve) return;
			}

			const salt = Math.floor(Math.random() * 1000);
			await lotteryContract.methods
				.commitMove(game.id, betValue, salt)
				.send({ from: accounts[0] });
			await updateGame();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	async function stopGame(e) {
		e.preventDefault();

		await lotteryContract.methods.stopGame(game.id).send({ from: accounts[0] });
		await updateGame();
	}

	console.log(game);
	console.log(dealer, accounts);
	console.log(typeof dealer != "undefined", accounts[0] == dealer);
	const isDealer = typeof dealer != "undefined" && accounts[0] == dealer;
	console.log(isDealer);

	const FormFaucet = () => (
		<form onSubmit={(e) => mintToken(e)}>
				<div className="form-group">
					<label htmlFor="Get Faucet">Mint 10000 token from Faucet</label>
					<input placeholder="Fill player address to get token from faucet" type="text" className="form-control" id="address_faucet" />
				</div>
				<button  type="submit" className="btn btn-primary">
					Mint 
				</button>
			</form>
	)

	const DealerComponent = () => {
		let FormGame;
		if (game){
			if ([2, 3].includes(game.state)) {
				FormGame = () => (
					<>
						<p>Bet: {game.id}</p>
						<div>
							<h2>Players</h2>
							<ul>
								{game.players.map((player) => (
									<li key={player}>{player}</li>
								))}
							</ul>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<h2>Close Game</h2>
								<button
									onClick={(e) => stopGame(e)}
									type="submit"
									className="btn btn-success"
								>
									Close Game
								</button>
							</div>
						</div>
					</>
				);
			}
			if (game.state === 4) {
				FormGame = () => (
					<>
						<p>Bet: {game.id}</p>
						<div>
							<h2>Winners</h2>
							<ul>
								{game.winners.map((player) => (
									<li key={player}>{player}</li>
								))}
							</ul>
							<div className="col-sm-12">
								<h2>Create Game</h2>
								<form onSubmit={(e) => createGame(e)}>
									<div className="form-group">
										<label htmlFor="bet">Bet Value</label>
										<input type="text" className="form-control" id="bet" />
									</div>
									<button type="submit" className="btn btn-primary">
										Submit
									</button>
								</form>
							</div>
						</div>
					</>
				);
			}
		} else {
			FormGame = () =>  (
				<div className="row">
					<div className="col-sm-12">
						<h2>Create Game</h2>
						<form onSubmit={(e) => createGame(e)}>
							<div className="form-group">
								<label htmlFor="bet">Bet Value</label>
								<input type="text" className="form-control" id="bet" />
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			);
		}
		return (
			<>
				<FormGame />
			</>
		)
	};

	const PlayerComponent = () => (
		<div className="row">
			<div className="col-sm-12">
				<h2>Bet</h2>
				<form onSubmit={(e) => bet(e)}>
					<div className="form-group">
						<label htmlFor="bet">Bet</label>
						<input type="text" className="form-control" id="bet" />
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);

	return (
		<div className="container">
			
			<h1 className="text-center">Lottery Game</h1>
			<FormFaucet />
			<div style={{height: 50}} />

			{accounts.length == 0 ? (
				"Please connect your wallet"
			) : isDealer ? (
				<DealerComponent />
			) : (
				<PlayerComponent />
			)}
		</div>
	);
}

export default App;
