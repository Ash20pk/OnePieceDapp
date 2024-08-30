This is a fun dApp that allows users to mint NFTs representing their One Piece pirate personalities. We will use Chainlink VRF to compute the options and generate a random NFT and The Graph to index the events

# Backend Setup
## Clone the repository:

```
git clone https://github.com/ash20pk/one-piece-nft-dapp.git
```

## Install the dependencies:
```
cd OnePieceDapp/Backend
npm install
```

## Configure the environment variables:

Create a .env file in the root of the Backend directory
Add the following variables:

```
PRIVATE_KEY=<your-private-key>
SUB_ID=<your-chainlink-vrf-subscription-id>
VRF_ADDRESS=<your-chainlink-vrf_address-id>
KEY_HASH=<your-chainlink-key_hash-id>
API_KEY=<your-abiscan-api>
```

## Deploying contract:

Deploy the contract using the following command:

```
npx hardhat run script/deploy.js --network arbitrum_sepolia
```
## Verifying contract:

```
npx hardhat verify --constructor-args arguments.js <your-contract-address> --network arbitrum_sepolia
```
# Interface Setup
```
cd ../Interface
```

## Install the dependencies:
```
npm install
```
## Configure the environment variables:

Create a .env file in the root of the Interface directory 
Add the following variables:

```
REACT_APP_CONTRACT_ADDRESS=<your-contract-address>
REACT_APP_SUBGRAPH_URL=<your-subgraph-url>
```
## Create a subgraph: 
Create the subgraph using Graph Studio: https://thegraph.com/studio/

## Setup the Graph Indexer
```
graph init --studio <subgraph-name>
```
Follow the on-screen instruction and set up the subgraph for Arbitrum Sepolia and also set the events a entity

## Deploy the Indexer
We'll need the deployer key shown in your Subgraph's draft (e.g., https://thegraph.com/studio/subgraph/<subgraph-name>)

Authenticate with your access token:
```
graph auth --studio <DEPLOY_KEY>
```
Then, navigate inside the Indexer directory and compile the subgraph:
```
cd bayc
graph codegen && graph build
```
Deploy the Subgraph:
```
graph deploy --studio <subgraph-name>
```

## Start the development server:
Now let's go back to the Interface folder and run the Interface
```
npm start
```
Open the dApp in your browser at http://localhost:3000
