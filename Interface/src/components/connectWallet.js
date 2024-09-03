import React, { useEffect, useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import nftABI from '../contract/OnePieceMint.json'

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

export function ConnectWallet({ children }) {
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [nftcontract, setNftcontract] = useState(null);

  const switchNetwork = async () => {
    const hexChainId = '0x66eee';
    try {

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
    } catch (error) {
      if ((error)?.code === 4902) { // 4902 - chain not added
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: '0x66eee',
            rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
            chainName: 'Arbitrum Sepolia Testnet',
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18
            },
            blockExplorerUrls: 'https://sepolia.arbiscan.io/'
          }]
        });
      }
    }
  }

  const nftContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;


  const connectWallet = async () => {
    await switchNetwork();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const account = await window.ethereum.request({ method: 'eth_accounts' });
      const instance = new ethers.Contract(nftContractAddress, nftABI.abi, signer);
      setNftcontract(instance);
      console.log(account[0]);
      setAccount(account[0]);
      setConnected(true);
      } catch (error) {
          return;
      }
  }

  const disconnectWallet = () => {
    setAccount(null);
    setConnected(false);
    setNftcontract(null);
  };

  return (
    <Web3Context.Provider value={{ account, disconnectWallet, connectWallet, connected, nftcontract, switchNetwork }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
}
