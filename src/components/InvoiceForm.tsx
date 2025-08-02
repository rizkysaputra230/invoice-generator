"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Typography,
  Upload,
  Space,
  Button,
  Divider,
} from "antd";
import {
  FileImageOutlined,
  UserOutlined,
  BankOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoicePrintPreviewDefault from "./templates/InvoicePrintPreviewDefault";
import InvoicePrintPreviewModern from "./templates/InvoicePrintPreviewModern";
import InvoicePrintPreviewClassic from "./templates/InvoicePrintPreviewClassic";
import InvoicePrintPreviewClean from "./templates/InvoicePrintPreviewClean";
import InvoicePrintPreviewMinimal from "./templates/InvoicePrintPreviewMinimal";
import InvoicePrintPreviewColorful from "./templates/InvoicePrintPreviewColorful";
import TemplateSelector from "./TemplateSelector";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const DashedBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-dashed border-gray-300 p-4 rounded mb-4">
    {children}
  </div>
);

interface InvoiceData {
  invoiceType: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromName: string;
  fromContact: string;
  toName: string;
  toContact: string;
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

const InvoiceForm = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceType: "Invoice",
    invoiceNumber: "0001",
    issueDate: "",
    dueDate: "",
    fromName: "",
    fromContact: "",
    toName: "",
    toContact: "",
    items: [],
    subtotal: 0,
    discount: 0,
    vat: 0,
    total: 0,
  });

  const updateItems = (items: any[], discount: number, vat: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const total = subtotal - discount + vat;

    setInvoiceData((prev) => ({
      ...prev,
      items: items.map((i) => ({
        id: uuidv4(),
        description: i.description || i.item,
        quantity: i.qty,
        price: i.price,
      })),
      subtotal,
      discount,
      vat,
      total,
    }));
  };

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePDF = async () => {
    if (!printRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf().set({ margin: 0.5, filename: "invoice.pdf", html2canvas: { scale: 2 } }).from(printRef.current).save();
  };

  const renderSelectedTemplate = () => {
    const props = {
      logoUrl,
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceType: invoiceData.invoiceType,
      issueDate: invoiceData.issueDate,
      dueDate: invoiceData.dueDate,
      fromName: invoiceData.fromName,
      fromContact: invoiceData.fromContact,
      toName: invoiceData.toName,
      toContact: invoiceData.toContact,
      items: invoiceData.items,
      subtotal: invoiceData.subtotal,
      discount: invoiceData.discount,
      vat: invoiceData.vat,
      total: invoiceData.total,
    };

    switch (selectedTemplate) {
      case "blank": return <InvoicePrintPreviewDefault {...props} />;
      case "modern": return <InvoicePrintPreviewModern {...props} />;
      case "classic": return <InvoicePrintPreviewClassic {...props} />;
      case "clean": return <InvoicePrintPreviewClean {...props} />;
      case "minimal": return <InvoicePrintPreviewMinimal {...props} />;
      case "colorful": return <InvoicePrintPreviewColorful {...props} />;
      default: return <InvoicePrintPreviewClassic {...props} />;
    }
  };

  useEffect(() => setIsClient(true), []);

  return (
    <>
      {isClient && (
        <div ref={printRef} className="print-preview hidden">
          {renderSelectedTemplate()}
        </div>
      )}

      <div className="no-print px-4 sm:px-6 md:px-10 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-8 bg-gradient-to-b from-blue-400 to-pink-300 bg-clip-text text-transparent">
          INVOICE GENERATOR
        </h1>

        <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-sm">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <DashedBox>
                    <Upload.Dragger
                      name="logo"
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={handleLogoUpload}
                      accept="image/*"
                    >
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full max-h-28 object-contain" />
                      ) : (
                        <>
                          <p className="ant-upload-drag-icon"><FileImageOutlined style={{ fontSize: 24 }} /></p>
                          <p>Choose logo or drop it here</p>
                        </>
                      )}
                    </Upload.Dragger>
                  </DashedBox>
                </div>

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DashedBox>
                    <Text strong>Invoice</Text>
                    <Select defaultValue="Invoice" style={{ width: "100%", marginTop: 8 }} onChange={(val) => setInvoiceData({ ...invoiceData, invoiceType: val })}>
                      <Option value="Invoice">Invoice</Option>
                      <Option value="Quote">Quote</Option>
                    </Select>
                  </DashedBox>

                  <DashedBox>
                    <Text strong>Number</Text>
                    <Input
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                      style={{ marginTop: 8 }}
                    />
                  </DashedBox>

                  <DashedBox>
                    <Text strong>Invoice Date</Text>
                    <DatePicker
                      style={{ width: "100%", marginTop: 8 }}
                      onChange={(_, dateString) => setInvoiceData({ ...invoiceData, issueDate: Array.isArray(dateString) ? dateString[0] : dateString })}
                    />
                  </DashedBox>

                  <DashedBox>
                    <Text strong>Due date (Optional)</Text>
                    <DatePicker
                      style={{ width: "100%", marginTop: 8 }}
                      onChange={(_, dateString) => setInvoiceData({ ...invoiceData, dueDate: Array.isArray(dateString) ? dateString[0] : dateString })}
                    />
                  </DashedBox>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <DashedBox>
                  <Text strong>From</Text>
                  <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                    <Input prefix={<BankOutlined />} placeholder="Sender name" onChange={(e) => setInvoiceData({ ...invoiceData, fromName: e.target.value })} />
                    <TextArea placeholder="Sender contact details" rows={2} onChange={(e) => setInvoiceData({ ...invoiceData, fromContact: e.target.value })} />
                  </Space>
                </DashedBox>

                <DashedBox>
                  <Text strong>To</Text>
                  <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                    <Input prefix={<UserOutlined />} placeholder="Recipient name" onChange={(e) => setInvoiceData({ ...invoiceData, toName: e.target.value })} />
                    <TextArea placeholder="Recipient contact details" rows={2} onChange={(e) => setInvoiceData({ ...invoiceData, toContact: e.target.value })} />
                  </Space>
                </DashedBox>
              </div>

              <DashedBox>
                <InvoiceItemsTable onChange={updateItems} />
              </DashedBox>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <Button icon={<PrinterOutlined />} onClick={handlePrint} block>Print</Button>
            </div>

            <div className="bg-white p-4 rounded space-y-1 text-sm">
              <div className="flex justify-between">
                <Text strong>Subtotal:</Text>
                <span>Rp {invoiceData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <Text strong>Discount:</Text>
                <span>- Rp {invoiceData.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <Text strong>Tax:</Text>
                <span>+ Rp {invoiceData.vat.toLocaleString()}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <Text strong>Total:</Text>
                <span>Rp {invoiceData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;