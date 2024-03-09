const Web3 = require('web3');
const fs = require('fs');

// Connect to Ethereum network using web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // Connect to a local Ethereum node. Change the URL if needed.

// Read the compiled contract bytecode and ABI
const bytecode = fs.readFileSync('ContractName_bytecode.txt', 'utf8');
const abi = JSON.parse(fs.readFileSync('ContractName_abi.json', 'utf8')); // Assuming you have the ABI in a JSON file

// Create a contract object
const contract = new web3.eth.Contract(abi);

// Set up an Ethereum account (this is just an example, you should use a secure method to manage your private keys)
const privateKey = 'YOUR_PRIVATE_KEY';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account); // Add the account to the wallet

// Deploy the contract
const deployContract = async () => {
    try {
        const deployedContract = await contract.deploy({
            data: '0x' + bytecode,
            arguments: [constructor_arguments] // Pass constructor arguments if any
        }).send({
            from: account.address,
            gas: 2000000, // Adjust gas limit as needed
            gasPrice: '30000000000' // Adjust gas price as needed
        });

        console.log('Contract deployed at address:', deployedContract.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
};

deployContract();
