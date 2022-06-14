import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const POLLING_INTERVAL = 3000

function getLibrary(provider) {
	const library = new Web3Provider(provider)
	library.pollingInterval = POLLING_INTERVAL
	return library
}

const Root = () => (
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
