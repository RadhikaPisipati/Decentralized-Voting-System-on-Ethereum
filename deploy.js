const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/rgaGE9iE3Hfg4bwHfXtyF8-axUVT2ftd"
  );
  const wallet = new ethers.Wallet(
    "1140e64f5df15a0957e0e09382de3a0b24b369f03dff5b7dc80aed8595c35499",
    provider
  );
  const abi = fs.readFileSync("./votee_sol_VotingSystem.abi", "utf8");
  const binary = fs.readFileSync(
    "./votee_sol_VotingSystem.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Contract is deploying...");
  const contract = await contractFactory.deploy();
  const deploymentreceipt = await contract.deploymentTransaction().wait(1);
  console.log(deploymentreceipt);
  console.log(contract);
  console.log("contract deployed successfully on sepolia testnet");
  const conAddress = await contract.getAddress();
  console.log("Contract address:", conAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




