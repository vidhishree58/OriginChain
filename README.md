# OriginChain — Blockchain-Based Product Tracking System

OriginChain is a blockchain-based product tracking system that helps track a product's journey from the manufacturer to the distributor and finally to the retailer. It uses Ethereum smart contracts to store product information and maintain a transparent journey history.

## Features

- **Connect Wallet:** Connect your MetaMask wallet to interact with the application.
- **Register Product:** Register a new product with a unique product ID, name, and other required details.
- **Search Product:** Search for a registered product using its product ID.
- **Update Product Stage:** Update a product's stage as it moves from Manufacturer to Distributor and then Retailer.
- **Product Journey:** View the recorded journey and stage history of a product.
- **Blockchain Integration:** Interact with a deployed Ethereum smart contract.
- **Transaction Transparency:** View contract activity on a blockchain explorer.

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- JavaScript

**Blockchain**
- Solidity
- Ethereum (Sepolia Testnet)
- ethers.js
- MetaMask

**Development Tools**
- Git and GitHub
- Remix IDE / Solidity development tools
- Blockscout Explorer

## Smart Contract Details

- **Network:** Sepolia Testnet
- **Chain ID:** 11155111
- **Contract Address:** `0x8C43eDCC6D1E9eC63f464344bA1c7CCFb3Ecd588`

The smart contract stores product information and manages product-stage updates on the blockchain.

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js and npm installed
- MetaMask browser extension installed
- A MetaMask wallet configured for the Sepolia Testnet
- Sepolia test ETH for blockchain transactions

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vidhishree58/OriginChain.git
   ```

2. Navigate to the project directory:

   ```bash
   cd OriginChain
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## How to Use

1. Start the application and open it in your browser.
2. Connect your MetaMask wallet.
3. Make sure MetaMask is connected to the Sepolia Testnet.
4. Register a product using a unique product ID.
5. Search for the product to view its details.
6. Update the product stage in the required order:
   - Manufacturer
   - Distributor
   - Retailer
7. View the product journey to check its recorded stages.
8. Use the Blockscout explorer to inspect the smart contract and its blockchain activity.

**Note:** Each product ID should be unique. If an ID is already registered, use a different one for a new product.

## Product Tracking Workflow

```text
Manufacturer
     |
     v
Distributor
     |
     v
Retailer
```

OriginChain records product-stage updates through smart contract transactions on the Sepolia Testnet.

## Testing

The following functionalities have been manually tested:

- MetaMask wallet connection
- Product registration
- Product search
- Product-stage updates
- Product journey history display
- Handling of invalid product IDs

Automated build and lint checks should be run before deployment.

## Limitations

- The application currently uses the Sepolia Testnet and is intended for testing and demonstration purposes.
- Users need MetaMask and Sepolia test ETH to perform blockchain transactions.
- The current smart contract does not implement role-based access control for stage updates. Production use would require appropriate access restrictions and additional security testing.
- Blockchain transactions may require confirmation and gas fees in test ETH.

## Future Improvements

- Add role-based access control for manufacturers, distributors, and retailers.
- Add QR-code-based product verification.
- Improve product authentication and anti-counterfeiting features.
- Add more detailed transaction and product-history views.
- Conduct additional smart contract security testing before production deployment.

## Project Purpose

OriginChain demonstrates how blockchain technology can improve transparency and traceability in product supply chains by maintaining a verifiable record of product movement.

---

**OriginChain — Transparent Product Tracking Through Blockchain Technology**
