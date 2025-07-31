import InvoiceGenerator from "@/components/InvoiceForm";
import './globals.css'; // jika Anda pakai Tailwind CSS


export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-100">
      <InvoiceGenerator />
    </main>
  );
}
