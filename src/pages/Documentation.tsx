import { useState } from 'react';
import {
  ShieldCheck, Server, Database, CheckCircle, Code, Zap, Download,
  ExternalLink, Lock, Menu, X, Terminal,
  Layout, Activity, CreditCard, List, Key, Info
} from 'lucide-react';

type BadgeVariant = 'blue' | 'green' | 'amber' | 'indigo';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge = ({ children, variant = 'blue' }: BadgeProps) => {
  const styles: Record<BadgeVariant, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  };
  return (
    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${styles[variant]}`}>
      {children}
    </span>
  );
};

const ApiDocumentation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'tech-stack', title: 'Tech Stack', icon: <Code size={18} /> },
    { id: 'live-access', title: 'Live Access', icon: <ExternalLink size={18} /> },
    { id: 'architecture', title: 'System Architecture', icon: <Layout size={18} /> },
    { id: 'data-model', title: 'Data Model', icon: <Database size={18} /> },
    { id: 'api-reference', title: 'API Reference', icon: <Activity size={18} /> },
    { id: 'conceptual-utils', title: 'Conceptual Utilities', icon: <Info size={18} /> },
    { id: 'security', title: 'Security & Identity', icon: <ShieldCheck size={18} /> },
    { id: 'key-features', title: 'Key Features', icon: <Zap size={18} /> },
    { id: 'getting-started', title: 'Getting Started', icon: <Terminal size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <CreditCard className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              <a href='/'>demoCredit</a> <span className="text-indigo-600 font-medium">Documentation</span>
            </span>
          </div>

          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className={`${isMenuOpen ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
          <div className="sticky top-28 space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-xl transition-all group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-slate-400 group-hover:text-indigo-500">{section.icon}</span>
                {section.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-20 pb-24">

          {/* Tech Stack */}
          <section id="tech-stack" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Tech Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Runtime', val: 'Node.js (Native http module)' },
                { label: 'Language', val: 'TypeScript' },
                { label: 'Database', val: 'PostgreSQL/MySQL (via Knex.js)' },
                { label: 'Validation', val: 'Zod' },
                { label: 'Testing', val: 'Vitest' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-slate-800">{item.val}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Live Demo & Access */}
          <section id="live-access" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Live Demo & API Access</h2>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <a href="https://democredit.netlify.app/login" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                  Web Client <ExternalLink size={16} />
                </a>
                <a href="https://democredit.netlify.app/democredit.postman_collection.json" download="democredit.postman_collection.json" className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition">
                  Download Postman Collection <Download size={16} />
                </a>
                <a href="https://democredit.netlify.app/swagger.json" download="swagger.json" className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition">
                  Download Swagger.json <Download size={16} />
                </a>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
                <div className="flex gap-4">
                  <Server className="text-amber-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-amber-900">Server Sleep Mode</h4>
                    <p className="text-amber-800 text-sm mt-1 leading-relaxed text-balance">
                      This project is hosted on a free-tier instance that powers down after about 15 minutes of inactivity and so the first request (via Web or Postman) may take 60+ seconds to complete as the server "wakes up." Subsequent requests will be faster once the instance is ‘awake’.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* System Architecture */}
          <section id="architecture" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">System Architecture</h2>
            <p className="text-slate-600 mb-8 italic">The application uses a Layered Architecture. Every request follows a strict lifecycle:</p>
            <div className="grid gap-4 mt-6">
              {[
                { label: 'Transport', text: 'index.ts receives the raw stream.' },
                { label: 'Routing', text: 'routes.ts matches the Method/Path and wraps the handler in asyncHandler.' },
                { label: 'Security', text: 'jwtGuard.ts validates the session for private routes.' },
                { label: 'Controller', text: 'Parses request bodies and validates schemas.' },
                { label: 'Service', text: 'Executes business logic (e.g., calling Lendsqr Karma API).' },
                { label: 'Data Access', text: 'Knex ensures atomic transactions and row-level locking.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <p className="text-sm font-medium text-slate-700">
                    <span className="font-bold text-slate-900">{step.label}:</span> {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Model */}
          <section id="data-model" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Model</h2>
            <p className="text-slate-600 mb-8">Based on migrations, the database is optimized with indexes on frequently queried fields like email, wallet_id, and reference.</p>

            <div className="space-y-10">
              {['users', 'wallets', 'transactions'].map((table) => (
                <div key={table} className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-indigo-900 uppercase tracking-widest text-sm">{table}</h3>
                  </div>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="px-6 py-3 text-left">Column</th>
                        <th className="px-6 py-3 text-left">Type</th>
                        <th className="px-6 py-3 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {table === 'users' && (
                        <>
                          <tr><td className="px-6 py-4 font-mono font-bold">id</td><td className="px-6 py-4">Increments</td><td className="px-6 py-4">Primary Key</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">phone</td><td className="px-6 py-4">String</td><td className="px-6 py-4">Unique</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">email</td><td className="px-6 py-4">String</td><td className="px-6 py-4">Unique</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">bvn</td><td className="px-6 py-4">String(11)</td><td className="px-6 py-4">Unique</td></tr>
                        </>
                      )}
                      {table === 'wallets' && (
                        <>
                          <tr><td className="px-6 py-4 font-mono font-bold">id</td><td className="px-6 py-4">Increments</td><td className="px-6 py-4">Primary Key</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">user_id</td><td className="px-6 py-4">Integer</td><td className="px-6 py-4">FK to Users (Unique)</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">balance</td><td className="px-6 py-4">BigInt</td><td className="px-6 py-4 text-slate-500">Stored in smallest denomination (e.g., Kobo)</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">is_disabled</td><td className="px-6 py-4">Boolean</td><td className="px-6 py-4">Soft-lock for wallets</td></tr>
                        </>
                      )}
                      {table === 'transactions' && (
                        <>
                          <tr><td className="px-6 py-4 font-mono font-bold">wallet_id</td><td className="px-6 py-4">Integer</td><td className="px-6 py-4">FK to Wallets</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">amount</td><td className="px-6 py-4">BigInt</td><td className="px-6 py-4">Transaction value</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">reference</td><td className="px-6 py-4">String</td><td className="px-6 py-4 font-bold text-indigo-600">Unique (IDEMPOTENCY KEY)</td></tr>
                          <tr><td className="px-6 py-4 font-mono font-bold">status</td><td className="px-6 py-4">Enum</td><td className="px-6 py-4">pending, success, failed</td></tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">API Reference</h2>

            <div className="space-y-16">
              {/* Auth */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  <Lock size={20} className="text-indigo-600" /> Auth Module
                </h3>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="green">POST</Badge>
                      <code className="font-bold text-slate-800">/api/auth/signup</code>
                      <Badge variant="blue">Public</Badge>
                    </div>
                    <p className="text-sm font-bold text-slate-500">Body: first_name, last_name, email, phone, password, bvn</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-700 font-bold">Behavior: Checks Karma blacklist with the BVN as ID before creating user/wallet.</p>
                    <div className="p-4 bg-indigo-50 rounded-xl text-xs text-indigo-900 leading-relaxed border border-indigo-100 italic">
                      It should however be stated here that because in test mode, the Karma API seems to return the same response when queried with an ID, the blacklisting simulation is set up to only be triggered by a specific string in the BVN field during signup. This string is ‘22222222222’. Passing another BVN would not trigger karma blacklisting. In a production application with the Lendsqr API in live mode, this conditional would be removed.
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="green">POST</Badge>
                    <code className="font-bold text-slate-800">/api/auth/login</code>
                    <Badge variant="blue">Public</Badge>
                  </div>
                  <p className="text-sm text-slate-700">Behavior: Validates credentials and sets an HttpOnly cookie.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2 text-slate-400 opacity-60">
                    <Badge variant="indigo">POST</Badge>
                    <code className="font-bold">/api/auth/logout</code>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">Behavior: Clears the auth cookie.</p>
                  <div className="text-xs p-4 bg-slate-100 rounded-xl text-slate-600 italic">
                    NOTE: The auth token is long lived, up to 24hrs. Refresh token functionality is not set up for this project because I deem it to not be necessary for the scope of this project. In a real production app, the JWT will be much shorter lived and refresh token functionality will be required.
                  </div>
                </div>
              </div>

              {/* Wallet */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  <CreditCard size={20} className="text-indigo-600" /> Wallet Module
                </h3>

                <div className="grid gap-4">
                  {[
                    { method: 'GET', path: '/api/wallet', return: 'Current balance and wallet status.', badge: 'blue' as BadgeVariant },
                    { method: 'POST', path: '/api/wallet/fund', body: 'amount, email, reference', behavior: 'Validates external payment reference and credits wallet.', badge: 'green' as BadgeVariant },
                    { method: 'POST', path: '/api/wallet/transfer', body: 'receiver_user_id, amount, reference, receiver_name', behavior: 'Atomic Debit/Credit with pessimistic locking on both wallets.', badge: 'green' as BadgeVariant },
                    { method: 'POST', path: '/api/wallet/withdraw', body: 'amount, reference, counterparty_id (Bank Acct)', behavior: 'Triggers withdrawal logic.', badge: 'green' as BadgeVariant }
                  ].map((route, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={route.badge}>{route.method}</Badge>
                        <code className="font-bold text-slate-800">{route.path}</code>
                      </div>
                      {route.body && <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wide">Body: {route.body}</p>}
                      {route.return && <p className="text-sm text-slate-700 font-bold">Return: {route.return}</p>}
                      {route.behavior && <p className="text-sm text-slate-700 italic">Behavior: {route.behavior}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ledger */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                  <List size={20} className="text-indigo-600" /> Ledger Module
                </h3>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="blue">GET</Badge>
                    <code className="font-bold text-slate-800">/api/ledger/get-user-ledger</code>
                  </div>
                  <p className="text-sm text-slate-700 font-bold">Return: Chronological list of all credits and debits.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Conceptual Utilities */}
          <section id="conceptual-utils" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Conceptual Utilities</h2>
            <p className="text-slate-600 mb-6 italic">
              The following helper functions are included in the codebase as non-executed demonstrations. They exist to illustrate an understanding of advanced fintech integration concepts and operational best practices.
            </p>

            <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl space-y-10 shadow-xl border border-slate-800">
              {/* getBankList */}
              <div className="border-b border-slate-800 pb-8">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <List size={18} className="text-indigo-400" /> getBankList()
                </h4>
                <p className="text-sm leading-relaxed opacity-90 italic">
                  This function would call an api to get a list of banks and their bankcodes for withdrawal.
                </p>
                <div className="mt-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-xs italic text-indigo-300 font-medium leading-relaxed">
                    Rationale: This is better than hardcoding on the frontend or storing in the db because the list would always be up-to date.
                    It is only unnecessary if we're maintaining the list ourselves.
                  </p>
                </div>
              </div>

              {/* verifyBankAccount */}
              <div>
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-400" /> verifyBankAccount()
                </h4>
                <p className="text-sm leading-relaxed opacity-90 italic">
                  Before completing a transfer, we would need to verify that the bank account is valid to avoid issues with incorrect transfers.
                  This would involve calling an api to verify the bank account and then show the response to the user on the client-side to confirm before proceeding with the transfer.
                </p>
                <div className="mt-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-xs italic text-indigo-300 font-medium leading-relaxed">
                    Operational Flow: In a production environment, this triggers an API call to verify the account number and name, providing the client-side user with a confirmation prompt to avoid issues with incorrect transfers.
                    For the purposes of this demo, this function returns <code className="text-white font-bold px-1">true</code> and assumes the user identity has been verified via the funding validation response.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Identity */}
          <section id="security" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Security and Identity</h2>

            <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl space-y-10 shadow-xl border border-slate-800">

              {/* Mandatory Bearer Authentication */}
              <div className="border-b border-slate-800 pb-8">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Lock size={18} className="text-indigo-400" /> Mandatory Bearer Authentication
                </h4>
                <p className="text-sm leading-relaxed italic opacity-90">
                  Access to protected resources is strictly by JWT authentication. Aside from explicitly defined public routes, all endpoints require a valid token to be present in the request context for successful authorization.
                </p>
              </div>

              {/* JWT-Anchored Identity */}
              <div className="border-b border-slate-800 pb-8">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-indigo-400" /> JWT-Anchored Identity
                </h4>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed italic opacity-90">
                    The API employs a strict zero trust identity enforcement policy. All non-public endpoints derive the subject's identity exclusively from the signed JWT stored in a secure HttpOnly cookie.
                  </p>
                  <p className="text-sm leading-relaxed italic opacity-90">
                    GET and POST requests do not accept user_id or wallet_id via parameters or request bodies. This helps protect against spoofing. By tying the user_id to the auth token, a user is unable to access or move funds from a wallet not explicitly tied to their own authenticated session.
                  </p>
                </div>
              </div>

              {/* Idempotency & Transaction Integrity */}
              <div className="border-b border-slate-800 pb-8">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Key size={18} className="text-indigo-400" /> Idempotency & Transaction Integrity
                </h4>
                <p className="text-sm leading-relaxed">
                  To ensure exactly-once processing and protect against replay attacks, unique transaction references are validated to prevent accidental duplication.
                </p>
                <p className="text-sm mt-2 italic opacity-60">
                  While only mocked in this demo, in a scaled environment, this is enforced using a Redis-backed distributed lock and SHA-256 hashing of request payloads to ensure that identical retries do not result in duplicate debits or credits.
                </p>
              </div>

              {/* Rate Limiting & DoS Protection */}
              <div className="border-b border-slate-800 pb-8">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Zap size={18} className="text-amber-400" /> Rate Limiting & DoS Protection
                </h4>
                <p className="text-sm leading-relaxed italic">
                  To safeguard against brute-force attempts and mitigate race condition exploits, the API implements a Rate Limiting layer at the entry point. Requests are throttled to a threshold of 1 request per second per IP address. Excessive traffic triggers a 429 response, protecting the database from connection exhaustion and protecting the authentication service from credential stuffing.
                </p>
              </div>

              {/* Transaction Validation */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" /> Transaction Validation
                </h4>
                <p className="text-sm leading-relaxed">
                  All wallet funding operations undergo third-party validation. Transactions are only committed to the ledger and persisted in the database after successful verification from our processing partners in order to prevent fraudulent or unconfirmed crediting.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="key-features" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Pessimistic Locking', desc: 'Uses .forUpdate() in SQL to prevent race conditions (double-spending).' },
                { title: 'Idempotency', desc: 'The reference field in the transactions table is unique. Retrying a transaction with the same reference will fail at the DB level, preventing duplicate charges.' },
                { title: 'Schema Safety', desc: 'Every input is strictly typed and validated via Zod before hitting the service layer.' },
                { title: 'Centralized Error Handling', desc: 'The asyncHandler captures all errors and returns standardized JSON responses.' },
              ].map((f, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed italic italic">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Getting Started</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-3xl p-8 font-mono text-sm leading-loose shadow-2xl">
                  <p className="text-slate-500 mb-2">// CLI Setup</p>
                  <p><span className="text-indigo-400">npm</span> install</p>
                  <p><span className="text-indigo-400">npx</span> knex migrate:latest</p>
                  <p><span className="text-indigo-400">npm</span> start</p>
                  <p><span className="text-indigo-400">npm</span> test</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">env.example</p>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 font-mono text-sm shadow-sm space-y-1">
                  {['PORT=', 'DB_PORT=', 'DB_HOST=', 'DB_USER=', 'DB_PASSWORD=', 'DB_NAME=', 'DB_CA_CERT_PATH=', 'APP_ID=', 'APP_SECRET=', 'SALT_ROUNDS='].map(env => (
                    <p key={env} className="text-slate-700">{env}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs italic tracking-widest uppercase">
            demoCredit Lendsqr Wallet MVP Documentation &copy; 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ApiDocumentation;