// App.js
import React, { useState } from "react";
import "./App.css";
import {MetaMaskConnect} from "./components/MetaMaskConnect";
import {PersonalityForm} from "./components/PersonalityForm";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showPersonalityForm, setShowPersonalityForm] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleSubmitPersonalityForm = () => {
    // Logic to handle form submission
    console.log("Personality form submitted!");
  };

  return (
    <div className="App">
      {!isWalletConnected ? (
        <MetaMaskConnect onConnect={handleWalletConnect} />
      ) : (
        <>
         <PersonalityForm/>
        </>
      )}
    </div>
  );
}

export default App;
