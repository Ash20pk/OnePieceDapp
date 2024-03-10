import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_SUBGRAPH_URL,
    cache: new InMemoryCache(),
});

const checkMintedEvent = async (minter) => {
    const query = gql`
      query GetNftMintedEvent($minter: Bytes!) {
        nftMinteds(where: { minter: $minter }) {
          id
          characterId
          minter
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `;
  
    const variables = {
      minter: minter,
    };

  try {
    const result = await client.query({ query, variables });
    const nftMinted = result.data.nftMinteds[0];

    if (nftMinted) {
      postMessage({ type: 'MINTED', data: nftMinted });
    } else {
      postMessage({ type: 'NOT_MINTED' });
    }
  } catch (error) {
    console.error("Error occurred while querying the subgraph:", error);
    postMessage({ type: 'ERROR', error: error.message });
  }
};

onmessage = (event) => {
  const { type, minter } = event.data;

  if (type === 'CHECK_MINTED') {
    checkMintedEvent(minter);
  }
};