

import DetailsClient from "@/components/DetailsPage/DetailsClient";


export default async function InvoiceDetailPage({ params }) {
  const { id } = await params;

  return (
    <DetailsClient id={id} />
  );
}
