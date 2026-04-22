import { headers } from "next/headers";

export default async function DebugInvoiceParams({ params }) {
  const resolvedParams = await params;

  // Get all headers as an object for debugging (headers() is iterable)
  const allHeaders = {};
  for (const pair of await headers()) {
    const [key, value] = pair;
    allHeaders[key] = value;
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>Debug Dynamic Route Params</h2>
      <div>
        <strong>params:</strong>
        <pre>{JSON.stringify(resolvedParams, null, 2)}</pre>
      </div>
      <div>
        <strong>All headers:</strong>
        <pre>{JSON.stringify(allHeaders, null, 2)}</pre>
      </div>
      <div>
        <strong>Environment:</strong>
        <pre>{JSON.stringify({ NODE_ENV: process.env.NODE_ENV }, null, 2)}</pre>
      </div>
    </main>
  );
}
