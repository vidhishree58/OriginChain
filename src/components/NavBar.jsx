
export default function Navbar({
  activeTab,
  setActiveTab,
  account,
  onConnect,
  connecting = false,
  isAdmin = false,
  onLogout,
}) {
  const tabs = [
    { id: "track", label: isAdmin ? "Track & Update" : "Track Product" },
    ...(isAdmin ? [{ id: "register", label: "Register Product" }] : []),
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

        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold ${
                  activeTab === tab.id
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {!isAdmin && (
              <button
                type="button"
                onClick={() => setActiveTab("admin")}
                className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold ${
                  activeTab === "admin"
                    ? "bg-teal-700 text-white"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                Admin Login
              </button>
            )}
          </nav>

          {isAdmin && (
            <>
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

              <button
                type="button"
                onClick={onLogout}
                className="min-h-11 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
