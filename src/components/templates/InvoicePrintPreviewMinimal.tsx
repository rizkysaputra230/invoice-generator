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

const InvoicePrintPreviewMinimal: React.FC<InvoicePrintPreviewProps> = ({
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
    <div className="max-w-3xl mx-auto p-10 text-gray-800 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 object-contain mb-2" />}
          <div className="text-xs text-gray-500">{invoiceType}</div>
        </div>
        <div className="text-right text-sm">
          <div className="font-semibold text-lg">{invoiceType}</div>
          <div className="text-gray-500">Invoice No: {invoiceNumber}</div>
          <div className="text-gray-500">Date: {issueDate}</div>
          {dueDate && <div className="text-gray-500">Due: {dueDate}</div>}
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <div className="text-gray-500 font-medium mb-1">From</div>
          <div>{fromName}</div>
          <div className="text-gray-600 whitespace-pre-line">{fromContact}</div>
        </div>
        <div>
          <div className="text-gray-500 font-medium mb-1">To</div>
          <div>{toName}</div>
          <div className="text-gray-600 whitespace-pre-line">{toContact}</div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-6">
        <div className="grid grid-cols-4 text-gray-500 font-medium border-b pb-2 mb-2">
          <div className="col-span-2">Description</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Total</div>
        </div>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 py-2 border-b last:border-none"
          >
            <div className="col-span-2">{item.description}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-right">
              Rp {(item.price * item.quantity).toLocaleString("id-ID")}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex justify-end mt-8">
        <div className="w-full max-w-sm space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span>- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>+ Rp {vat.toLocaleString("id-ID")}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintPreviewMinimal;
