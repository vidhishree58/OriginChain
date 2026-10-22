# OriginChain — Blockchain-Based Product Tracking System

OriginChain is a blockchain-based product tracking web application that enables users to track a product's journey from the manufacturer to the distributor and finally to the retailer. Built using React and Ethereum smart contracts, it provides transparent product information and a verifiable history of product-stage updates.

🌐 **Live Website:** https://originchain.netlify.app/  
📂 **GitHub Repository:** https://github.com/vidhishree58/OriginChain

## Features

- **Public Product Tracking:** Search for products using a unique product ID without connecting a wallet.
- **Product Details:** View registered product information and its current stage.
- **Product Journey:** Explore the recorded stages and history of a product.
- **Admin Login:** Access the administrative interface to manage products.
- **Product Registration:** Register new products with their required details.
- **Product Stage Updates:** Update a product's stage as it moves through the supply chain.
- **MetaMask Integration:** Connect a wallet to perform blockchain transactions.
- **Blockchain Transparency:** Interact with a deployed Ethereum smart contract and inspect transactions using a blockchain explorer.

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

Product-stage updates are recorded through smart contract transactions on the Ethereum Sepolia Testnet.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript

### Blockchain
- Solidity
- Ethereum Sepolia Testnet
- ethers.js
- MetaMask

### Development Tools
- Git and GitHub
- Remix IDE
- Blockscout Explorer

## Smart Contract Details

- **Network:** Ethereum Sepolia Testnet
- **Chain ID:** `11155111`
- **Contract Address:** `0x8C43eDCC6D1E9eC63f464344bA1c7CCFb3Ecd588`

The smart contract stores product information and records product-stage updates on the blockchain.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Git
- MetaMask browser extension (required for wallet-based transactions)
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

3. Install the dependencies:

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

### Public Users

1. Open the website.
2. Navigate to the product tracking section.
3. Enter a registered product ID.
4. View the product details, current stage, and available journey history.

Public tracking does not require an admin login or wallet connection.

### Administrators

1. Open the admin login section.
2. Log in using the configured demo credentials.
3. Connect MetaMask when performing blockchain transactions.
4. Register a product using a unique product ID and the required details.
5. Search for a registered product.
6. Update its stage as it moves through the supply chain.
7. View the product journey and recorded history.
8. Use a blockchain explorer to inspect relevant transactions.

**Note:** Each product ID must be unique. If an ID is already registered, choose a different one.

## Blockchain Explorer

You can inspect the deployed contract and its on-chain activity using a Sepolia-compatible blockchain explorer.

- **Contract address:** `0x8C43eDCC6D1E9eC63f464344bA1c7CCFb3Ecd588`
- **Network:** Sepolia Testnet

## Testing

The following features are intended to be tested during development:

- Wallet connection
- Product registration
- Product search
- Product-stage updates
- Product journey and history display
- Invalid product ID handling
- Public tracking and admin interface separation

Run the following commands before deployment to check that the project builds correctly:

```bash
npm run build
```

If the project has a configured lint script, you can also run:

```bash
npm run lint
```

## Limitations

- The application currently uses the Sepolia Testnet and is intended for demonstration and testing.
- Blockchain transactions require wallet approval and test ETH.
- Demo login credentials in a frontend-only application should not be considered secure authentication.
- If the smart contract does not enforce role-based permissions, users may be able to submit stage updates directly through the contract.
- Production deployment requires appropriate access control, authentication, and smart contract security testing.

## Future Improvements

- Implement role-based access control for manufacturers, distributors, and retailers.
- Add QR-code-based product verification.
- Strengthen authentication and authorization.
- Improve transaction details and product-history visualizations.
- Add comprehensive automated tests.
- Conduct smart contract security audits before production use.

## Project Purpose

OriginChain demonstrates how blockchain technology can improve transparency and traceability in supply chains. By maintaining product information and stage updates on a blockchain, the application helps users inspect a product's journey through different stages of distribution.

---

**OriginChain — Transparent Product Tracking Through Blockchain Technology**
