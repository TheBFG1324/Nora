const ethers = require('ethers');
require('dotenv').config();
const crypto = require('crypto');

// Load the ABI
const abi = require("../abi/DataFarm.json")
const contractAddress = process.env.DATA_FARM_CONTRACT_ADDRESS;

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.PROVIDER);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Connect to the contract
const dataFarm = new ethers.Contract(contractAddress, abi, wallet);

function sha256(inputString) {
    // Step 2: Create a SHA-256 hash instance
    const hash = crypto.createHash('sha256');

    // Step 3: Input the data to hash
    hash.update(inputString);

    // Step 4: Compute the hash and output as a buffer (32-byte array)
    const hashBuffer = hash.digest();

    // Optionally convert the hash to a hexadecimal string
    const hashHex = hashBuffer.toString('hex');

    return {
        byteArray: hashBuffer,  // This is your 32-byte array (Buffer in Node.js)
        hexString: hashHex      // Hexadecimal string representation of the hash
    };
}

async function createFarm() {
    const hash = sha256("Hello world")
    const tx = await dataFarm.createFarm(
        "test",
        0,  // FarmType.ImageClassification
        0,  // BountyType.LumpSum
        10,  // payout per response
        500,    // maxPayout
        '0x' + hash.hexString,  // payloadHash as bytes32
        1,  // payoutPeriod (1 day)
        { value: 700 }
    );
    const receipt = await tx.wait();
    console.log('Create Farm Transaction Receipt:', receipt);
    const logs = receipt.logs

    const farmCreatedLog = logs.find(log => log.fragment && log.fragment.name === 'FarmCreated');
    if (farmCreatedLog) {
        const eventDetails = {
            farmId: farmCreatedLog.args[0],
            description: farmCreatedLog.args[1],
            farmType: farmCreatedLog.args[2].toString(),
            bountyType: farmCreatedLog.args[3].toString(),
            payout: farmCreatedLog.args[4].toString(),
            maxPayout: farmCreatedLog.args[5].toString(),
            payloadHash: farmCreatedLog.args[6],
            payoutPeriod: farmCreatedLog.args[7].toString(),
            timestamp: farmCreatedLog.args[8].toString()
        };
        return eventDetails;
    } else {
        console.log("No 'FarmCreated' event found in the logs.");
        return null
    }
}


async function insertInstance(farmId) {
    const tx = await dataFarm.insertInstance(
        farmId,
        '0x'+sha256("Hello world").hexString,
        wallet.address  // assuming the wallet address is the responder
    );
    const receipt = await tx.wait();
    console.log('Insert Instance Transaction Receipt:', receipt);
}

async function sendRewards(farmId) {
    const tx = await dataFarm.sendRewards(farmId);
    const receipt = await tx.wait();
    console.log('Send Rewards Transaction Receipt:', receipt);
}

async function pause() {
    const tx = await dataFarm.pause();
    const receipt = await tx.wait();
    console.log('Pause Transaction Receipt:', receipt);
}

async function unpause() {
    const tx = await dataFarm.unpause();
    const receipt = await tx.wait();
    console.log('Unpause Transaction Receipt:', receipt);
}

async function getFarms() {
    const farms = await dataFarm.getFarms();
    console.log('Farms:', farms);
}

async function getFarm(index) {
    const farm = await dataFarm.getFarm(index);
    console.log('Farm:', farm);
}

async function main() {
    const farmId = "0x5b8f5ffbbc5a45fc92dee8a9336127f73062a41ad5b3459a269f9db4adbcc56a"
    try {
        //await pause();
        // Uncomment other function calls as needed
        // await unpause();
        //const response = await createFarm();
        //console.log(response)
        //await insertInstance(farmId);
        await sendRewards(farmId);
        //await getFarms();
        // await getFarm(0);  // Example index, adjust based on actual data
    } catch (error) {
        console.error('Error in main execution:', error);
    }
}

main();

