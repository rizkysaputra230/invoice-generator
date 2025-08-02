"use client";

import { useSearchParams } from "next/navigation";
import InvoicePrintPreview from "@/components/templates/InvoicePrintPreviewDefault";

const PreviewPage = () => {
  const searchParams = useSearchParams();

  const parseJSON = (param: string | null) => {
    try {
      return param ? JSON.parse(decodeURIComponent(param)) : null;
    } catch {
      return null;
    }
  };

  const invoiceData = parseJSON(searchParams.get("data"));
  const logoUrl = searchParams.get("logo");

  if (!invoiceData) return <p>Invalid preview data</p>;

  return (
    <div className="bg-white min-h-screen p-8">
      <InvoicePrintPreview {...invoiceData} logoUrl={logoUrl || null} />
    </div>
  );
};

export default PreviewPage;
