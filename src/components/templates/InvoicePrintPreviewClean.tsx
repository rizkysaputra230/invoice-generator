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

const InvoicePrintPreviewClean: React.FC<InvoicePrintPreviewProps> = ({
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
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800 font-sans print-preview">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-20 object-contain" />
        ) : (``)}
        <div className="text-right">
          <h2 className="text-2xl font-semibold">{invoiceType}</h2>
          <p className="text-sm">Invoice No: <strong>{invoiceNumber}</strong></p>
          <p className="text-sm">Date: {issueDate}</p>
          {dueDate && <p className="text-sm">Due: {dueDate}</p>}
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <p className="font-semibold text-gray-700 mb-1">From</p>
          <p>{fromName}</p>
          <p className="text-gray-600 whitespace-pre-line">{fromContact}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-1">To</p>
          <p>{toName}</p>
          <p className="text-gray-600 whitespace-pre-line">{toContact}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-sm mb-8 border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-gray-600 border-b border-gray-200">
            <th className="py-2">Description</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="bg-gray-50 hover:bg-gray-100 transition-all">
              <td className="py-2 px-2">{item.description}</td>
              <td className="text-center py-2 px-2">{item.quantity}</td>
              <td className="text-right py-2 px-2">Rp {item.price.toLocaleString("id-ID")}</td>
              <td className="text-right py-2 px-2">Rp {(item.quantity * item.price).toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-red-500">- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-green-600">+ Rp {vat.toLocaleString("id-ID")}</span>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintPreviewClean;
