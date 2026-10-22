
import ProductJourney from "./ProductJourney.jsx";

export default function ProductDetails({
  product,
  onUpdateStage,
  updating = false,
}) {
  const currentStage = product.currentStage || product.stage || "—";

  const nextStage =
    currentStage === "Manufacturer"
      ? "Distributor"
      : currentStage === "Distributor"
      ? "Retailer"
      : null;

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm text-slate-500">Product details</p>
          <h3 className="mt-1 wrap-break-word text-2xl font-bold text-slate-900">
            {product.name}
          </h3>
        </div>

        <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800">
          {currentStage}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Product ID", product.id],
          ["Brand", product.brand],
          ["Manufacturer", product.manufacturer],
          ["Current Stage", currentStage],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 wrap-break-word text-sm font-semibold text-slate-800">
              {value || "—"}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
        {nextStage ? (
          <>
            <p className="text-sm text-slate-600">
              Move this product to the next supply-chain stage.
            </p>
            <button
              type="button"
              onClick={() => onUpdateStage?.()}
              disabled={updating || !onUpdateStage}
              className="mt-3 w-full rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {updating ? "Updating blockchain..." : `Update to ${nextStage}`}
            </button>
          </>
        ) : (
          <p className="text-sm font-semibold text-teal-800">
            Product journey completed — this product has reached the Retailer.
          </p>
        )}
      </div>

      <ProductJourney history={product.history || []} />
    </section>
  );
}
