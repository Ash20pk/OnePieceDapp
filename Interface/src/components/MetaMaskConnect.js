import React, { useEffect, useState, createContext, useContext } from 'react';
import Web3 from 'web3';

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

function ConnectWallet({ children }) {
  const [web3js, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (web3js) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3js.eth.getAccounts();
        const account = accounts[0];
        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        if (currentChainId != 80001) {
          alert("Connect to Polygon Mumbai Testnet")
        }
        console.log(account);
        setAccount(account);
        setConnected(true);
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setConnected(false);
  };

  return (
    <Web3Context.Provider value={{ web3js, account, disconnectWallet, connectWallet, connected, setConnected }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
}

export default ConnectWallet;