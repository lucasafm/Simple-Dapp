import React from 'react'

import './Home.css';

const Home = () => {
    return (
        <div className='homeDiv'>
            <span className='homeText'>Welcome, This is a simple Dapp experiment to see how to connect a web application to a MetaMask account, and modify a value in a smart contract.
            The contract is located in the Sepolia ETH testnet, and has a simple string value, you can read this value and connect your MetaMask account to modify it.
            Remember that modifing a smart contract cost gas, in this case SepoliaETH, which you can get through a faucet: </span>
            <a href="https://sepoliafaucet.com/">sepoliafaucet.com</a>
            <span className='homeText'>To start press the radio logo.</span>
        </div>
    )
}

export default Home;