import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";

import ButtonConnect from "./ButtonConnect";
// import LotteryGame from "./contracts/LotteryGame.json";
// import MonToken from "./contracts/Mon.json";
import LotteryGame from "./abi/LotteryGame.json";
import MonToken from "./abi/Mon.json";
import { getWeb3 } from "./getWeb3";


function App() {
	const [web3, setWeb3] = useState(undefined);
	const [lotteryContract, setGameContract] = useState(undefined);
	const [tokenContract, setTokenContract] = useState(undefined);
	const [allowance, setAllowance] = useState(0);
	const [dealer, setDealer] = useState(undefined);
	const [game, setGame] = useState(undefined);

	const { account,  } = useWeb3React()

	const isReady = useCallback(() => {
		return (
			typeof lotteryContract !== "undefined" &&
			typeof tokenContract !== "undefined" &&
			typeof web3 !== "undefined" &&
			typeof account !== "undefined"
		);
	}, [account, lotteryContract, tokenContract, web3]);
	

	const updateGame = useCallback(async () =>{
		try {
			let gameId = parseInt(await lotteryContract.methods.gameId().call());
			gameId = gameId > 0 ? gameId - 1 : gameId;
			const game = await lotteryContract.methods.getGame(gameId).call();
			if (typeof game[2] != 'string') {
				return
			} else {
				setGame({
					id: game[0],
					bet: game[1],
					state: game[2],
					players: game[3],
					winners: game[4],
				});
			}
		} catch (err) {
			console.log(err.message);
		}
	}, [lotteryContract])

	const checkAllowence = useCallback(async() => {
		try {
			const allowance = await tokenContract.methods.allowance(account, lotteryContract._address).call();
			setAllowance(parseInt(allowance));
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	}, [account, tokenContract, lotteryContract]);

	const makeApprove = async (value) => {
		try {
			const amount = web3.utils.toWei(value);
			await tokenContract.methods.approve(lotteryContract._address, amount).send({ from: account });
			setAllowance(value)
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const createGame = async (e) => {
		e.preventDefault();
		try {
			const betValue = e.target.elements[0].value;
			const amount = web3.utils.toWei(betValue);
			await lotteryContract.methods.createGame(amount).send({ from: account });
			await updateGame();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	const mintToken = async (e) => {
		e.preventDefault();
		if (!tokenContract) return;

		// const address = e.target.elements[0].value.trim();
		try {
			const amount = web3.utils.toWei('10000')
			await tokenContract.methods.faucet(account, amount).send({from: account})
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	}

	const bet = async (e) => {
		e.preventDefault();
		if (!game) {
			alert('game not created yet!')
			return;
		}

		const betValue = e.target.elements[0].value;
		try {
			if (allowance < game.bet) {
				
				const approve = await makeApprove(game.bet);
				if (!approve) return;
			}

			await lotteryContract.methods
				.bet(game.id, betValue, '6')
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
			// MonToken.abi,
			// deployedNetworkLotteryGameERC20Token && deployedNetworkLotteryGameERC20Token.address
			// '0x7a25b8352D46E39347A082Fd920f0Eb0108ab8dA'
			MonToken,
			'0x902163Ed629ca73194Bfbcf1198ec700d18eF536',
		);
		
		const lotteryContract = new web3.eth.Contract(
			// LotteryGame.abi,
			// deployedNetworkLotteryGame && deployedNetworkLotteryGame.address
			// '0x7F59F3Ca0782de6Dcd91AafDaF67FE473af5A52d',
			LotteryGame,
			'0x31F2f91E4993E0eC99137DabdD9192bb24C8DCA8'
		);
		
		const _dealer = await lotteryContract.methods.dealer().call();

		setWeb3(web3);
		setTokenContract(tokenContract);
		setGameContract(lotteryContract);
		setDealer(_dealer);
	};

	useEffect(() => {
		init();
	}, [])

	useEffect(() => {
		const _isReady = isReady()
		if (_isReady) {
			updateGame();
			checkAllowence();
		}
	}, [account, isReady, checkAllowence, updateGame]);

	const isDealer = typeof dealer != "undefined" && account == dealer;

	const FormFaucet = () => (
		<form onSubmit={(e) => mintToken(e)}>
				<div className="form-group">
					<label htmlFor="Get Faucet">Mint 10000 token from Faucet</label>
					{/* <input placeholder="Fill player address to get token from faucet" type="text" className="form-control" id="address_faucet" /> */}
				</div>
				<button  type="submit" className="btn btn-primary">
					Mint 
				</button>
			</form>
	)
	
	// if (lotteryContract)
	// lotteryContract.methods.bets(2,'0xCDD51523ed1511209AE2e5bB65f21D93c49D4201').call().then(console.log)

	const DealerComponent = () => {
		let FormGame = '';
		if (game){
			if (["1", "2"].includes(game.state)) {
				FormGame = () => (
					<>
						<h2>Bet GameID: {parseInt(game.id) + 1}</h2>
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
			if (game.state == "3") {
				FormGame = () => (
							<div>
						<h2>Bet: {parseInt(game.id) + 1}</h2>
								<h2>Winners</h2>
								<ul>
									{game.winners && game.winners.length > 0 ? (game.winners.map((player) => (
										<li key={player}>{player}</li>
									))) : account}
								</ul>
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
				{allowance < game.bet ? (
					<button type="submit" onClick={(e) => makeApprove(game.bet)} className="btn btn-primary">
					Approve
				</button>
				) : (
					<form onSubmit={(e) => bet(e)}>
						<div className="form-group">
							<label htmlFor="bet">Bet</label>
							<input type="text" className="form-control" id="bet" />
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				)}
			</div>
		</div>
	);
	
	return (
		
			<div className="container">
				<ButtonConnect />
				<h1 className="text-center">Lottery Game</h1>
				<FormFaucet />
				<div style={{height: 50}} />
				{game ? isDealer ? 
					<DealerComponent />
				: 
					<PlayerComponent />
				: null
				}
			</div>
	);
}

export default App;
