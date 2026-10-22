
export default function Navbar({
  activeTab,
  setActiveTab,
  account,
  onConnect,
  connecting = false
}) {
  const tabs = [
    { id: "track", label: "Track Product" },
    { id: "register", label: "Register Product" }
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-teal-800">
            OriginChain
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Product Tracking System
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <nav aria-label="Main navigation"
            className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-semibold sm:flex-none ${
                  activeTab === tab.id
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={onConnect}
            disabled={connecting}
            className="min-h-11 rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50 disabled:opacity-60"
          >
            {connecting
              ? "Connecting..."
              : account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
