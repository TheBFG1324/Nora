# Nora - Decentralized Data Annotation Protocol

**Nora** is a decentralized protocol designed to streamline data annotation tasks by leveraging **Ethereum smart contracts** and **The Graph** for efficient log querying. It empowers contributors to participate in annotation tasks with transparency and fairness, providing an automated mechanism for rewards distribution.

## Features

- **Decentralized Backend**: 
  - Built on **Ethereum smart contracts** to ensure secure and trustless operations.
  - Implements a flexible system for creating annotation tasks (referred to as "Farms") with customizable reward mechanisms.
  
- **Reward Mechanism**:
  - Supports two bounty types: 
    - **Lump Sum**: A fixed reward divided among all participants.
    - **Per Person**: Individual rewards for each valid response.
  - Automatic payout distribution based on task completion and time-based conditions.

- **Efficient Log Querying**:
  - Integrated with **The Graph** to query logs and events, improving transparency and reducing on-chain data overhead.

## Smart Contract Functionality

### Key Components:
1. **Farm Creation**:
   - Users can create farms for various annotation tasks, such as:
     - Image Classification
     - Object Detection
     - Sentiment Analysis
     - Video Annotation
     - Best Response Selection
   - Configurable options include reward type, payout period, and maximum allocation for rewards.

2. **Response Submission**:
   - Participants submit their responses securely.
   - Ensures no duplicate submissions from the same user.

3. **Reward Distribution**:
   - Rewards are distributed automatically after the payout period, ensuring fairness and efficiency.

### Smart Contract Highlights:
- **Modifiers**:
  - `onlyOwner`: Ensures only the owner can execute sensitive actions.
  - `onlyChainlink`: Restricts certain functions to Chainlink nodes for oracle-based tasks.
  - `notPaused`: Prevents actions when the contract is paused.

- **Events**:
  - `FarmCreated`: Logs when a new farm is created.
  - `ResponseAdded`: Logs when a response is submitted.
  - `RewardsSent`: Logs when rewards are distributed.

## Tools and Technologies

- **Ethereum Smart Contracts**: Solidity programming language.
- **Hardhat**: Development and testing framework.
- **The Graph**: For efficient and scalable log querying.
- **Chainlink**: Used for external oracle integration (e.g., data feeds or off-chain triggers).

## Future Enhancements

- **Frontend Integration**: Build a user-friendly interface for task creation and participation.
- **Additional Task Types**: Expand support for more annotation categories.
- **Cross-Chain Support**: Enable interoperability with other blockchain networks.

---

**Nora** represents a step forward in decentralized task management, enabling transparent and trustless coordination for data annotation tasks. Its backend ensures fairness, security, and scalability, making it a robust solution for collaborative workflows.

