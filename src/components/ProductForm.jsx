
import { useState } from "react";

const initialForm = {
  id: "",
  name: "",
  brand: "",
  manufacturer: ""
};

const fields = [
  { name: "id", label: "Product ID", placeholder: "e.g. PROD101" },
  { name: "name", label: "Product Name", placeholder: "Enter product name" },
  { name: "brand", label: "Brand", placeholder: "Enter brand name" },
  {
    name: "manufacturer",
    label: "Manufacturer",
    placeholder: "Enter manufacturer name"
  }
];

export default function ProductForm({ contract, account, onMessage }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!contract || !account) {
      onMessage("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      onMessage("Please confirm the registration transaction in MetaMask.");

      const tx = await contract.registerProduct(
        form.id.trim(),
        form.name.trim(),
        form.brand.trim(),
        form.manufacturer.trim()
      );

      onMessage("Transaction submitted. Waiting for confirmation...");
      await tx.wait();

      onMessage(`Product ${form.id.trim()} registered successfully on Sepolia!`);
      setForm(initialForm);
    } catch (err) {
      onMessage(
        err.reason ||
          err.shortMessage ||
          err.message ||
          "Product registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
    >
      <h3 className="text-lg font-bold text-slate-900">
        Product information
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        All fields are required.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.name}
            className="block min-w-0 text-sm font-medium text-slate-700"
          >
            {field.label}
            <input
              required
              name={field.name}
              value={form[field.name]}
              placeholder={field.placeholder}
              onChange={(e) =>
                setForm((previous) => ({
                  ...previous,
                  [field.name]: e.target.value
                }))
              }
              className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 min-h-12 w-full rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        {loading ? "Registering..." : "Register Product"}
      </button>
    </form>
  );
}
