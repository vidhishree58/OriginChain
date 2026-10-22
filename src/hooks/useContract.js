
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x8C43eDCC6D1E9eC63f464344bA1c7CCFb3Ecd588";

const ABI = [
  "function registerProduct(string,string,string,string)",
  "function updateStage(string,string)",
  "function getProduct(string) view returns (string,string,string,string,bool)",
  "function getProductHistory(string) view returns (string[])"
];

export default function useContract() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  async function connectWallet() {
    try {
      setError("");

      // Check whether MetaMask is available
      const ethereum = window.ethereum;

      if (!ethereum) {
        throw new Error(
          "MetaMask is not detected. Open this website in Chrome and refresh."
        );
      }

      // Connect wallet first
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("Please unlock MetaMask and try again.");
      }

      setAccount(accounts[0]);

      // Contract connection needs a deployed contract address
      if (!CONTRACT_ADDRESS) {
        throw new Error(
          "Wallet connected! Contract address is still missing."
        );
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const instance = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      setContract(instance);
      return instance;
    } catch (err) {
      setError(err.shortMessage || err.message || "Wallet connection failed.");
      return null;
    }
  }

  return { contract, account, error, connectWallet };
}
