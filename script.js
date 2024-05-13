const contractAddress = '0xC741A6D9091fF1B91458b47F01c8d850dE244e42';
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "Candidates", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "phno", "type": "uint256" }, { "internalType": "uint256", "name": "totalvotes", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "getCandidate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "getVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "add", "type": "address" }], "name": "voteCast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "voters", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];

async function loadCandidates() {
    const candidateNames = ["Rick", "Seline"];
    const candidatesDiv = document.getElementById('candidates');
    candidateNames.forEach((name, index) => {
        candidatesDiv.innerHTML += `<div><b>${name}</b> - <button onclick="getCandidateInfo(${index + 1})">Get Info</button></div>`;
    });
}

async function loadVotes() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const rickVotes = await contract.methods.getVotes(1).call();
    document.getElementById('rickVotes').textContent = `Rick - ${rickVotes}`;

    const selineVotes = await contract.methods.getVotes(2).call();
    document.getElementById('selineVotes').textContent = `Seline - ${selineVotes}`;
}

async function vote() {
    const web3 = new Web3(window.ethereum);

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const from = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const candidateId = document.getElementById('candidateId').value;
        await contract.methods.vote(candidateId).send({ from });
        console.log('Vote successful');
        loadVotes();
    } catch (error) {
        console.error('Error while voting:', error);
    }
}

async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Wallet connected');
        loadVotes();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function getCandidateInfo(candidateId) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const candidateInfo = await contract.methods.getCandidate(candidateId).call();
        const candidateDetailsDiv = document.getElementById('candidateDetails');
        candidateDetailsDiv.innerHTML = `<h3>Candidate Details</h3><p>ID: ${candidateInfo[0]}</p><p>Name: ${candidateInfo[1]}</p><p>Phone Number: ${candidateInfo[2]}</p>`;
    } catch (error) {
        console.error('Error getting candidate info:', error);
    }
}

async function verifyVote() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const userAddressInput = document.getElementById('userAddress');
    const userAddress = userAddressInput.value.trim();
    const voteVerificationResult = document.getElementById('voteVerificationResult');

    if (!userAddress) {
        voteVerificationResult.innerHTML = '<p>Please enter your wallet address.</p>';
        return;
    }

    const isValidAddress = /^(0x)?[0-9a-f]{40}$/i.test(userAddress);

    if (!isValidAddress) {
        voteVerificationResult.innerHTML = '<p>Invalid wallet address. Please enter a valid Ethereum wallet address.</p>';
        return;
    }

    try {
        const voteStatus = await contract.methods.voteCast(userAddress).call();
        if (voteStatus > 0) {
            voteVerificationResult.innerHTML = '<p>You have already voted.</p>';
        } else {
            voteVerificationResult.innerHTML = '<p>You have not voted yet.</p>';
        }
    } catch (error) {
        console.error('Error verifying vote:', error);
        voteVerificationResult.innerHTML = '<p>An error occurred while verifying your vote. Please try again later.</p>';
    }
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        console.log('Ethereum provider detected');
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    loadCandidates();
});


