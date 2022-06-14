import { InjectedConnector } from '@web3-react/injected-connector'

const NETWORKS = [1, 4, 42, 56, 77, 97, 99, 128, 137, 256, 11112, 11110, 1337]

// const POLLING_INTERVAL = 3000

export const injected = new InjectedConnector({
	supportedChainIds: NETWORKS
})
