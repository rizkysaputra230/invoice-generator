"use client";

import React from "react";

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface InvoicePrintPreviewProps {
  logoUrl: string | null;
  invoiceNumber: string;
  invoiceType: string;
  issueDate: string;
  dueDate: string;
  fromName: string;
  fromContact: string;
  toName: string;
  toContact: string;
  items: Item[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

const InvoicePrintPreviewClassic: React.FC<InvoicePrintPreviewProps> = ({
  logoUrl,
  invoiceNumber,
  invoiceType,
  issueDate,
  dueDate,
  fromName,
  fromContact,
  toName,
  toContact,
  items,
  subtotal,
  discount,
  vat,
  total,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 print-preview font-serif text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-400 pb-6 mb-10">
        <div>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          )}
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold uppercase tracking-wider">{invoiceType}</h2>
          <p className="text-sm mt-2">Invoice No: <span className="font-medium">{invoiceNumber}</span></p>
          <p className="text-sm">Date: {issueDate}</p>
          {dueDate && <p className="text-sm">Due Date: {dueDate}</p>}
        </div>
      </div>

      {/* From / To */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2 pr-6">
          <h4 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">From:</h4>
          <p className="text-sm">{fromName}</p>
          <p className="text-sm whitespace-pre-line text-gray-700">{fromContact}</p>
        </div>
        <div className="w-1/2 pl-6">
          <h4 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">To:</h4>
          <p className="text-sm">{toName}</p>
          <p className="text-sm whitespace-pre-line text-gray-700">{toContact}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border border-gray-400 text-sm mb-10">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-400">
            <th className="text-left px-4 py-2 border-r border-gray-400">Description</th>
            <th className="text-center px-4 py-2 border-r border-gray-400">Qty</th>
            <th className="text-right px-4 py-2 border-r border-gray-400">Price</th>
            <th className="text-right px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="px-4 py-2 border-r border-gray-300">{item.description}</td>
              <td className="text-center px-4 py-2 border-r border-gray-300">{item.quantity}</td>
              <td className="text-right px-4 py-2 border-r border-gray-300">Rp {item.price.toLocaleString("id-ID")}</td>
              <td className="text-right px-4 py-2">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm text-sm">
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
            <span>Subtotal:</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
            <span>Discount:</span>
            <span>- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
            <span>Tax:</span>
            <span>+ Rp {vat.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4">
            <span>Total:</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintPreviewClassic;
