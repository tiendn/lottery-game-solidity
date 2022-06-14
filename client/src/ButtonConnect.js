import * as React  from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'

import {
	NoEthereumProviderError,
} from '@web3-react/injected-connector'
import { injected } from './connectors'
import {  useInactiveListener, useEagerConnect } from './hooks'


function getErrorMessage(error) {
	if (error instanceof NoEthereumProviderError) {
		return 'No Metamask Extension detected, install Metamask Extension on desktop or visit from a dApp browser on mobile.'
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network."
	} else {
		console.error(error)
		return 'An unknown error occurred. Check the console for more details.'
	}
}

const ButtonConnect = () => {
	const { connector,  account, activate, deactivate, active, error } = useWeb3React()
	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = React.useState()
	React.useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])
	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

	const onConnectWallet = React.useCallback(() => {
		setActivatingConnector(injected)
		activate(injected)
	}, [activate])

	const onDisconnectWallet = React.useCallback(() => {
		setActivatingConnector(undefined)
		deactivate()
	}, [deactivate])

	if (!active)
		return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBlock: 20 }}>
                <button type="submit" className="btn btn-primary" onClick={onConnectWallet}>
                    Connect Wallet
                </button>
            </div>
		)
	if (error) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBlock: 20 }}>
				{!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
			</div>
		)
	}
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
				alignItems: 'center',
				marginBlock: 20
			}}
		>
			<div style={{ marginBottom: 20 }}>
				Hi <span style={{ color: 'orange' }}>{account}</span> <br />
			</div>
			<button type="submit" className="btn btn-primary" onClick={onDisconnectWallet}>
				Disconnect
			</button>
		</div>
	)
}

export default ButtonConnect