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

const InvoicePrintPreviewColorful: React.FC<InvoicePrintPreviewProps> = ({
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
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-100 text-gray-800 font-sans print-preview">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="h-20 object-contain rounded" />
        )}
        <div className="text-right">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500">
            {invoiceType}
          </h1>
          <p className="text-sm">Invoice No: <strong>{invoiceNumber}</strong></p>
          <p className="text-sm">Date: {issueDate}</p>
          {dueDate && <p className="text-sm">Due: {dueDate}</p>}
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-2 gap-6 mb-10 text-sm">
        <div className="bg-white/70 p-4 rounded shadow-sm border-l-4 border-pink-400">
          <h3 className="text-pink-600 font-semibold uppercase mb-1">From</h3>
          <p className="font-semibold">{fromName}</p>
          <p className="text-gray-600 whitespace-pre-line">{fromContact}</p>
        </div>
        <div className="bg-white/70 p-4 rounded shadow-sm border-l-4 border-green-400">
          <h3 className="text-green-600 font-semibold uppercase mb-1">To</h3>
          <p className="font-semibold">{toName}</p>
          <p className="text-gray-600 whitespace-pre-line">{toContact}</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm mb-6 border-separate border-spacing-y-1">
        <thead>
          <tr className="text-white bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500">
            <th className="text-left px-4 py-2 rounded-l-md">Description</th>
            <th className="text-center px-4 py-2">Qty</th>
            <th className="text-right px-4 py-2">Price</th>
            <th className="text-right px-4 py-2 rounded-r-md">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="bg-white shadow-md rounded-md">
              <td className="px-4 py-3 border-b border-gray-200">{item.description}</td>
              <td className="text-center px-4 py-3 border-b border-gray-200">{item.quantity}</td>
              <td className="text-right px-4 py-3 border-b border-gray-200 text-blue-600">
                Rp {item.price.toLocaleString("id-ID")}
              </td>
              <td className="text-right px-4 py-3 border-b border-gray-200 text-blue-600">
                Rp {(item.quantity * item.price).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end mt-10">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-red-500">- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-green-600">+ Rp {vat.toLocaleString("id-ID")}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-extrabold text-indigo-700">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintPreviewColorful;
