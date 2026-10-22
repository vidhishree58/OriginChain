
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS =
  "0x8C43eDCC6D1E9eC63f464344bA1c7CCFb3Ecd588";

const ABI = [
  "function registerProduct(string,string,string,string)",
  "function updateStage(string,string)",
  "function getProduct(string) view returns (string,string,string,string,bool)",
  "function getProductHistory(string) view returns (string[])"
];

const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";

export default function useContract() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  // Public read-only connection: no wallet needed
  const [readContract] = useState(() => {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  });

  async function connectWallet() {
    try {
      setError("");

      if (!window.ethereum) {
        throw new Error("MetaMask is not detected.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("Please unlock MetaMask and try again.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 11155111n) {
        throw new Error("Please switch MetaMask to Sepolia network.");
      }

      const signer = await provider.getSigner();
      const instance = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      setAccount(accounts[0]);
      setContract(instance);
      return instance;
    } catch (err) {
      setError(err.shortMessage || err.message || "Wallet connection failed.");
      return null;
    }
  }

  return {
    contract,
    readContract,
    account,
    error,
    connectWallet
  };
}
