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

const InvoicePrintPreviewModern: React.FC<InvoicePrintPreviewProps> = ({
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
    <div className="max-w-5xl mx-auto bg-[#111827] text-white p-10 font-sans print-preview">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
        <div>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-16 w-auto object-contain rounded-md bg-white p-1"
            />
          )}
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            {invoiceType}
          </h1>
          <p className="text-sm text-gray-300 mt-2">No: <span className="font-semibold">{invoiceNumber}</span></p>
          <p className="text-sm text-gray-400">Date: {issueDate}</p>
          {dueDate && <p className="text-sm text-gray-400">Due: {dueDate}</p>}
        </div>
      </div>

      {/* From / To Section */}
      <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
        <div className="bg-gray-900 p-4 rounded-md shadow">
          <h3 className="text-gray-400 uppercase text-xs mb-2 font-medium">From</h3>
          <p className="text-base font-semibold text-white">{fromName}</p>
          <p className="text-gray-300 whitespace-pre-line text-xs">{fromContact}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-md shadow">
          <h3 className="text-gray-400 uppercase text-xs mb-2 font-medium">To</h3>
          <p className="text-base font-semibold text-white">{toName}</p>
          <p className="text-gray-300 whitespace-pre-line text-xs">{toContact}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden border border-gray-700 rounded-md mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="text-left px-6 py-3">Description</th>
              <th className="text-center px-6 py-3">Qty</th>
              <th className="text-right px-6 py-3">Price</th>
              <th className="text-right px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-400">
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-800">
                <td className="px-6 py-4">{item.description}</td>
                <td className="text-center px-6 py-4">{item.quantity}</td>
                <td className="text-right px-6 py-4">Rp {item.price.toLocaleString("id-ID")}</td>
                <td className="text-right px-6 py-4">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-gray-900 p-6 rounded-md shadow text-sm space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>Discount</span>
            <span>- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Tax</span>
            <span>+ Rp {vat.toLocaleString("id-ID")}</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintPreviewModern;
