// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataFarm {
    address public owner;
    address public chainlinkAddress;
    bool public paused = false;

    constructor(address _chainlinkAddress) {
        owner = msg.sender;
        chainlinkAddress = _chainlinkAddress;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyChainlink() {
        require(msg.sender == chainlinkAddress, "Caller is not the Chainlink node");
        _;
    }

    modifier notPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    event Paused(address by);
    event Unpaused(address by);
    event FarmCreated(bytes32 indexed farmId, string description, FarmType farmType, BountyType bountyType, uint256 payout, uint maxPayout, bytes32 payloadHash, uint256 payoutPeriod, uint256 timestamp);
    event ResponseAdded(bytes32 indexed farmId, bytes32 payload, address responder);
    event RewardsSent(bytes32 indexed farmId, uint256 numberOfResponders, uint256 payoutPerResponder);

    function pause() public onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }

    enum BountyType {LumpSum, PerPerson}
    enum FarmType {ImageClassification, ObjectDetection, VideoAnnotation, SentimentAnalysis, BestResponse}

    struct Response {
        bytes32 payload;
        address responder;
    }

    struct Farm {
        bytes32 farmId;
        FarmType farmType;
        BountyType bountyType;
        uint256 payout;  // payout per response for PerPerson, ignored for LumpSum
        uint maxPayout;  // Total funds allocated for payouts
        bytes32 payloadHash;
        Response[] responses;
        mapping(address => bool) inResponses;
        uint256 payoutPeriod;
        uint256 timestamp;
    }

    Farm[] public farms;
    mapping(bytes32 => uint) public farmIdToIndex;

    function createFarm(
        string memory _description, 
        FarmType _farmType, 
        BountyType _bountyType, 
        uint256 _payout, 
        uint256 _maxPayout, 
        bytes32 _payloadHash, 
        uint256 _payoutPeriod
    ) public payable notPaused returns (bytes32) {
        require(msg.value > _maxPayout, "Insufficient funds for potential payout and gas costs.");
        bytes32 farmId = keccak256(abi.encodePacked(block.timestamp, msg.sender));

        Farm storage newFarm = farms.push();
        newFarm.farmId = farmId;
        newFarm.farmType = _farmType;
        newFarm.bountyType = _bountyType;
        newFarm.payout = _payout;
        newFarm.maxPayout = _maxPayout;
        newFarm.payloadHash = _payloadHash;
        newFarm.payoutPeriod = _payoutPeriod;
        newFarm.timestamp = block.timestamp;

        farmIdToIndex[farmId] = farms.length - 1;

        emit FarmCreated(farmId, _description, _farmType, _bountyType, _payout, _maxPayout, _payloadHash, _payoutPeriod, block.timestamp);
        return farmId;
    }

    function insertInstance(
        bytes32 farmId,
        bytes32 payload,
        address responder
    ) public notPaused {
        uint index = farmIdToIndex[farmId];
        Farm storage farm = farms[index];
        require(!farm.inResponses[responder], "Responder can only submit once.");
        farm.responses.push(Response(payload, responder));
        farm.inResponses[responder] = true;
        emit ResponseAdded(farmId, payload, responder);
    }

    function sendRewards(bytes32 farmId) public onlyChainlink notPaused {
        uint index = farmIdToIndex[farmId];
        Farm storage farm = farms[index];
        uint256 numberOfResponders = farm.responses.length;
        require(numberOfResponders > 0, "No responders to reward");
        require(block.timestamp >= farm.timestamp + farm.payoutPeriod, "The payout period has not yet elapsed.");

        uint256 payoutPerResponder;
        if (farm.bountyType == BountyType.LumpSum) {
            payoutPerResponder = farm.maxPayout / numberOfResponders;
        } else if (farm.bountyType == BountyType.PerPerson) {
            payoutPerResponder = farm.payout;
        }

        for (uint i = 0; i < numberOfResponders; i++) {
            payable(farm.responses[i].responder).transfer(payoutPerResponder);
        }
        emit RewardsSent(farmId, numberOfResponders, payoutPerResponder);
    }
}