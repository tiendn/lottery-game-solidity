import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

import ButtonConnect from "./ButtonConnect";
import LotteryGame from "./contracts/LotteryGame.json";
import MonToken from "./contracts/Mon.json";
import { getWeb3 } from "./getWeb3";


function App() {
	const [web3, setWeb3] = useState(undefined);
	const [lotteryContract, setGameContract] = useState(undefined);
	const [tokenContract, setTokenContract] = useState(undefined);
	const [allowance, setAllowance] = useState(0);
	const [dealer, setDealer] = useState(undefined);
	const [game, setGame] = useState();

	const { account,  } = useWeb3React()

	const isReady = () => {
		return (
			typeof lotteryContract !== "undefined" &&
			typeof tokenContract !== "undefined" &&
			typeof web3 !== "undefined" &&
			typeof account !== "undefined"
		);
	};

	

	async function updateGame() {
		try {
			let gameId = parseInt(await lotteryContract.methods.gameId().call());
			gameId = gameId > 0 ? gameId - 1 : gameId;

			const game = await lotteryContract.methods.getGame(gameId).call();
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
			const allowance = await tokenContract.methods.allowance(account, lotteryContract._address).call();
			setAllowance(allowance);
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const makeApprove = async (value) => {
		try {
			await tokenContract.methods.approve(value).send({ from: account });
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const createGame = async (e) => {
		e.preventDefault();
		try {
			const betValue = e.target.elements[0].value;
			await lotteryContract.methods.createGame(betValue).send({ from: account });
			await updateGame();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const mintToken = async (e) => {
		e.preventDefault();
		if (!tokenContract) return;

		const address = e.target.elements[0].value.trim();
		console.log(tokenContract.methods)
		try {
			await tokenContract.methods.faucet(address, 10000).send({from: account})
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
				.send({ from: account });
			await updateGame();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	async function stopGame(e) {
		e.preventDefault();

		await lotteryContract.methods.stopGame(game.id).send({ from: account });
		await updateGame();
	}

	const init = async () => {
		const web3 = await getWeb3();
		// const networkId = await web3.eth.net.getId();
		// const deployedNetworkLotteryGame = LotteryGame.networks[networkId];
		// const deployedNetworkLotteryGameERC20Token = MonToken.networks[networkId];
		const tokenContract = new web3.eth.Contract(
			MonToken.abi,
			// deployedNetworkLotteryGameERC20Token && deployedNetworkLotteryGameERC20Token.address
			'0x7a25b8352D46E39347A082Fd920f0Eb0108ab8dA'
		);
		
		const lotteryContract = new web3.eth.Contract(
			LotteryGame.abi,
			// deployedNetworkLotteryGame && deployedNetworkLotteryGame.address
			'0x7F59F3Ca0782de6Dcd91AafDaF67FE473af5A52d'
		);
		
		const _dealer = await lotteryContract.methods.dealer().call();

		setWeb3(web3);
		setTokenContract(tokenContract);
		setGameContract(lotteryContract);
		setDealer(_dealer);
	};

	useEffect(() => {
		if (isReady()) {
			updateGame();
			checkAllowence();
		}
	}, [account]);

	useEffect(() => {
		console.log("sfasdfasd",account)
		if (account)
			init();
	}, [account]);

	const isDealer = typeof dealer != "undefined" && account == dealer;

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
				<ButtonConnect />
				<h1 className="text-center">Lottery Game</h1>
				<FormFaucet />
				<div style={{height: 50}} />

				{isDealer ? 
					<DealerComponent />
				: 
					<PlayerComponent />
				}
			</div>
	);
}

export default App;
