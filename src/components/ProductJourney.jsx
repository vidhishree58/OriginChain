
const stageNames = {
  manufacturer: "Manufacturer",
  distributor: "Distributor",
  retailer: "Retailer"
};

export default function ProductJourney({ history = [] }) {
  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <h4 className="text-base font-bold text-slate-900">
        Product Journey
      </h4>
      <p className="mt-1 text-sm text-slate-500">
        Recorded stages in the product's supply chain.
      </p>

      {history.length === 0 ? (
        <p className="mt-5 rounded-lg bg-slate-50 px-4 py-5 text-sm text-slate-500">
          No journey history available.
        </p>
      ) : (
        <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3">
          {history.map((stage, index) => {
            const stageLabel =
              stageNames[String(stage).toLowerCase()] || stage;

            return (
              <li
                key={`${stage}-${index}`}
                className="relative flex gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-800 ring-1 ring-teal-100">
                  {index + 1}
                </span>

                <div className="min-w-0 pt-1">
                  <p className="wrap-break-word text-sm font-semibold text-slate-800">
                    {stageLabel}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Supply chain stage
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
