const axios = require('axios');

const GRAPHQL_URL = 'https://api.studio.thegraph.com/query/71357/nora/v0.0.1';

function graphqlRequest(query, variables = {}) {
    return axios.post(GRAPHQL_URL, {
        query,
        variables
    })
    .then(response => {
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    })
    .catch(error => {
        console.error('Error executing query: ', error.message);
    });
}

// Define GraphQL queries
const QUERY_FARM_CREATED = `
    query {
        farmCreateds {
            id
            farmId
            description
            farmType
            bountyType
            payout
            maxPayout
            payloadHash
            payoutPeriod
            timestamp
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`;

const QUERY_PAUSED = `
    query {
        pauseds {
            id
            by
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`;

const QUERY_RESPONSE_ADDED = `
    query {
        responseAddeds {
            id
            farmId
            payload
            responder
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`;

const QUERY_REWARDS_SENT = `
    query {
        rewardsSents {
            id
            farmId
            numberOfResponders
            payoutPerResponder
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`;

const QUERY_UNPAUSED = `
    query {
        unpauseds {
            id
            by
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`;

const QUERY_LATEST_PAUSED = `
  query getLatestPause {
    pauseds(orderBy: blockTimestamp, orderDirection: desc, first: 1) {
      blockTimestamp
    }
  }
`;

const QUERY_LATEST_UNPAUSED = `
query getLatestUnPause {
    unpauseds(orderBy:blockTimestamp, orderDirection: desc, first: 1){
      blockTimestamp
    }
  }`;

  const QUERY_SPECIFIC_FARM_CREATED = `
  query GetSpecificFarmCreated($farmId: Bytes!) {
    farmCreateds(where: {farmId: $farmId}) {
      id
      description
      farmType
      bountyType
      payout
      maxPayout
      payloadHash
      payoutPeriod
      timestamp
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const QUERY_SPECIFIC_RESPONSE_ADDED = `
  query GetSpecificResponseAdded($responder: Bytes!) {
    responseAddeds(where: {responder: $responder}) {
      id
      farmId
      payload
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const QUERY_SPECIFIC_REWARDS_SENT = `
  query GetSpecificRewardsSent($farmId: Bytes!) {
    rewardsSents(where: {farmId: $farmId}) {
      id
      numberOfResponders
      payoutPerResponder
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;


function runAllQueries() {
    console.log("Running GraphQL Queries...");
    // Example variables for demonstration; replace these with actual values as needed.
    const specificFarmId = "0x...";
    const specificResponder = "0x...";
    graphqlRequest(QUERY_FARM_CREATED);
    graphqlRequest(QUERY_PAUSED);
    graphqlRequest(QUERY_RESPONSE_ADDED);
    graphqlRequest(QUERY_REWARDS_SENT);
    graphqlRequest(QUERY_UNPAUSED);
    // Run specific queries with variables
    graphqlRequest(QUERY_SPECIFIC_FARM_CREATED, { farmId: specificFarmId });
    graphqlRequest(QUERY_SPECIFIC_RESPONSE_ADDED, { responder: specificResponder });
    graphqlRequest(QUERY_SPECIFIC_REWARDS_SENT, { farmId: specificFarmId });
}

runAllQueries();
