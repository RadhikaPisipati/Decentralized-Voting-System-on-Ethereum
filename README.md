# Decentralised Voting System on Ethereum

## Introduction

This project is a decentralized voting application (DApp) built on blockchain technology, aiming to ensure transparent and secure elections. The DApp comprises a smart contract deployed with candidate names and a specified voting period. Users interact with the contract through a user-friendly web interface, connecting their Web3 wallets to cast votes for candidates by ID. Once the voting period ends, the function is disabled, and results are displayed.

## Features

- **Decentralized:** Built on blockchain technology to eliminate the vulnerabilities associated with centralized voting systems.
- **Smart Contract:** Developed a Solidity smart contract to manage candidate names, voting duration, and enforce the rules of the voting process.
- **Integration with the Contract:** Created a front end using HTML, CSS, and JavaScript to seamlessly integrate with the smart contract, allowing users to interact with the voting system.
- **Web3 Wallet Integration:** Users can securely connect their Web3 wallets (e.g., MetaMask) to cast votes and monitor real-time results.
- **Real-time Updates:** Provides real-time updates on the status of the voting process, including remaining voting time and the number of votes cast for each candidate.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repository`
2. Navigate to the project directory: `cd your-repository`
3. Install dependencies:
   ```bash
   npm install
   yarn
   corepack enable
   yarn add solc@0.8.7-fixed
   yarn add ethers yarn add fs
   ```
4. Compile the contract:

solcjs --abi votee.sol   
solcjs --bin votee.sol  

5. Deploy the contract:  

node deploy.js  

## Technologies Used

Solidity  
Ethereum Blockchain  
HTML/CSS/JavaScript  
Web3.js  
Node.js  

## Contributors

Radhika Pisipati (https://github.com/RadhikaPisipati)  
Saanvi R Prabhu (https://github.com/saanvi1375)  
Suhani Lalla (https://github.com/SuhaniLalla)  

   
