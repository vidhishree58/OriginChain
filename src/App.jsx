import { useState } from "react";
import Navbar from "./components/NavBar.jsx";
import ProductForm from "./components/ProductForm.jsx";
import ProductSearch from "./components/ProductSearch.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import useContract from "./hooks/useContract.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("track");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const { contract, account, error, connectWallet } = useContract();
  const [updatingStage, setUpdatingStage] = useState(false);

  function changeTab(tab) {
    setActiveTab(tab);
    setMessage("");
    setProduct(null);
  }

  async function handleSearch(id) {
    if (!contract) {
      setMessage("Please connect your wallet first.");
      return;
    }

    try {
      setProduct(null);
      setMessage("Searching for product on the blockchain...");

      const result = await contract.getProduct(id.trim());

      if (!result[4]) {
        setMessage(`Product "${id}" was not found.`);
        return;
      }

      const history = await contract.getProductHistory(id.trim());

      setProduct({
        id: id.trim(),
        name: result[0],
        brand: result[1],
        manufacturer: result[2],
        currentStage: result[3],
        history: [...history],
      });

      setMessage(`Product "${id}" found on Sepolia!`);
    } catch (err) {
      setMessage(
        err.reason ||
          err.shortMessage ||
          err.message ||
          "Unable to fetch product details.",
      );
    }
  }

  async function handleUpdateStage() {
    if (!contract || !product || updatingStage) {
      setMessage("Please connect your wallet first.");
      return;
    }

    const nextStage =
      product.currentStage === "Manufacturer"
        ? "Distributor"
        : product.currentStage === "Distributor"
          ? "Retailer"
          : null;

    if (!nextStage) {
      setMessage("Product has already reached the Retailer stage.");
      return;
    }

    try {
      setUpdatingStage(true);
      setMessage(`Please confirm the ${nextStage} transaction in MetaMask.`);

      const tx = await contract.updateStage(product.id, nextStage);

      setMessage(
        "Transaction submitted. Waiting for blockchain confirmation...",
      );
      await tx.wait();

      const result = await contract.getProduct(product.id);
      const history = await contract.getProductHistory(product.id);

      setProduct({
        id: product.id,
        name: result[0],
        brand: result[1],
        manufacturer: result[2],
        currentStage: result[3],
        history: [...history],
      });

      setMessage(`Success! Product stage updated to ${result[3]}.`);
    } catch (err) {
      setMessage(
        err.reason || err.shortMessage || err.message || "Stage update failed.",
      );
    } finally {
      setUpdatingStage(false);
    }
  }

  async function handleConnectWallet() {
    const instance = await connectWallet();

    if (instance) {
      setMessage("Wallet connected successfully.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        account={account}
        onConnect={handleConnectWallet}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <section className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            Product transparency · Powered by blockchain
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {activeTab === "track"
                  ? "Track a product"
                  : "Register a product"}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                {activeTab === "track"
                  ? "Look up product information and follow its journey through the supply chain."
                  : "Enter the product details to create its traceable record."}
              </p>
            </div>

            <div className="w-fit rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-medium text-teal-800">
              Manufacturer → Distributor → Retailer
            </div>
          </div>
        </section>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {error}
          </div>
        )}

        {activeTab === "track" ? (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)] lg:gap-8">
            <ProductSearch onSearch={handleSearch} />

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <p className="text-sm font-semibold text-slate-900">
                How product tracking works
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Each registered product has a unique ID. Its recorded stages
                help users follow its movement across the supply chain.
              </p>

              <div className="mt-6 space-y-5">
                {[
                  ["01", "Manufacturer", "Product is registered."],
                  ["02", "Distributor", "Product moves through distribution."],
                  ["03", "Retailer", "Product reaches the retailer."],
                ].map(([number, title, description]) => (
                  <div key={number} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-800">
                      {number}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {title}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {product && (
              <div className="lg:col-span-2">
                <ProductDetails
                  product={product}
                  onUpdateStage={handleUpdateStage}
                  updating={updatingStage}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)] lg:gap-8">
            <ProductForm
              contract={contract}
              account={account}
              onMessage={setMessage}
            />

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <p className="text-sm font-semibold text-slate-900">
                Before registering
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
                <li>• Use a unique product ID.</li>
                <li>• Enter the correct product and manufacturer details.</li>
                <li>
                  • Confirm the details before submitting the transaction.
                </li>
              </ul>
            </aside>
          </div>
        )}
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
        OriginChain <span className="mx-1.5 text-slate-300">|</span>
        Blockchain-Based Product Tracking System
      </footer>
    </div>
  );
}
