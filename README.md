# Sepolia Testnet dApp

This is a decentralized application (dApp) built with React and ethers.js. It connects to the Sepolia Ethereum testnet, interacts with MetaMask, and provides functions to read from and write values to a smart contract deployed on the Sepolia testnet.

## Functionality

- Connect to the Sepolia testnet using MetaMask.
- Read the value stored in the smart contract.
- Write a new value to the smart contract.
- Display the result of the read operation.

## Smart contract

In this example the smart contract being use has a Read and Write method, the solidity file used to create the contract is under [src/contracts](./src/contracts/Contract.sol) you can upload yours using [Remix](http://remix.ethereum.org/) and saving the address for later use

## Installation

1. Configure MetaMask:
    - Install the MetaMask browser extension
    - Connect MetaMask to the Sepolia testnet. You may need to add the Sepolia testnet network details manually. If you need testnet Eth, you can obtain it from the [Sepolia Faucet](https://sepoliafaucet.com/).

2. Clone the repository:

   ```bash
   git clone https://github.com/lucasafm/Simple-Dapp.git
   ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. create an .env file:
    ```bash
    echo 'REACT_APP_CONTRACT_ADDRESS = ***' > .env
    ```
    replacing the '***' with the address of the smart contract
