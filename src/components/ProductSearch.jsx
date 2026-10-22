
import { useState } from "react";

export default function ProductSearch({ onSearch }) {
  const [productId, setProductId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = productId.trim();

    if (id) onSearch(id);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
    >
      <h3 className="text-lg font-bold text-slate-900">
        Find a product
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        Enter the unique ID assigned to the product.
      </p>

      <label
        htmlFor="product-id"
        className="mt-6 block text-sm font-medium text-slate-700"
      >
        Product ID
      </label>

      <input
        id="product-id"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="e.g. PROD101"
        required
        className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
      />

      <button
        type="submit"
        className="mt-4 min-h-12 w-full rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Track Product
      </button>

      <p className="mt-4 text-xs leading-5 text-slate-400">
        Search a registered product to view its verified supply-chain journey on Sepolia.
      </p>
    </form>
  );
}
