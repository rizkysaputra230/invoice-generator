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
  EyeOutlined,
  SaveOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoicePrintPreview from "./templates/InvoicePrintPreview";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;


const DashedBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      border: "1px dashed #ccc",
      padding: 12,
      borderRadius: 6,
      marginBottom: 16,
    }}
  >
    {children}
  </div>
);

const InvoiceForm = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
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
        id: uuidv4(), // ✅ ID unik untuk row key
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

  const handlePreview = () => {
    printRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePDF = async () => {
    if (!printRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .set({ margin: 0.5, filename: "invoice.pdf", html2canvas: { scale: 2 } })
      .from(printRef.current)
      .save();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Hidden print preview for printing only */}
    {isClient && (
      <div ref={printRef} className="print-preview" style={{ display: 'none' }}>
        <InvoicePrintPreview
          logoUrl={logoUrl}
          invoiceNumber={invoiceData.invoiceNumber}
          invoiceType={invoiceData.invoiceType}
          issueDate={invoiceData.issueDate}
          dueDate={invoiceData.dueDate}
          fromName={invoiceData.fromName}
          fromContact={invoiceData.fromContact}
          toName={invoiceData.toName}
          toContact={invoiceData.toContact}
          items={invoiceData.items}
          subtotal={invoiceData.subtotal}
          discount={invoiceData.discount}
          vat={invoiceData.vat}
          total={invoiceData.total}
        />
      </div>
    )}
      {/* Main form UI - hidden during print */}
      <div className="no-print">
        <Row gutter={24}>
          {/* Left section - main form */}
          <Col span={18}>
            <div style={{ padding: 24, background: "#fff" }}>
              {/* Logo and Header Info */}
              <Row gutter={16}>
                <Col span={6}>
                  <DashedBox>
                    <Upload.Dragger
                      name="logo"
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={handleLogoUpload}
                      accept="image/*"
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Logo"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 120,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <>
                          <p className="ant-upload-drag-icon">
                            <FileImageOutlined style={{ fontSize: 24 }} />
                          </p>
                          <p>Choose logo or drop it here</p>
                        </>
                      )}
                    </Upload.Dragger>
                  </DashedBox>
                </Col>
                <Col span={18}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <DashedBox>
                        <Text strong>Invoice</Text>
                        <Select
                          defaultValue="Invoice"
                          style={{ width: "100%", marginTop: 8 }}
                          onChange={(val) => setInvoiceData({ ...invoiceData, invoiceType: val })}
                        >
                          <Option value="Invoice">Invoice</Option>
                          <Option value="Quote">Quote</Option>
                        </Select>
                      </DashedBox>
                    </Col>
                    <Col span={8}>
                      <DashedBox>
                        <Text strong>Number</Text>
                        <Input
                          value={invoiceData.invoiceNumber}
                          onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                          style={{ marginTop: 8 }}
                        />
                      </DashedBox>
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <DashedBox>
                          <Text strong>Invoice Date</Text>
                          <DatePicker
                            style={{ width: "100%", marginTop: 8 }}
                            onChange={(_, dateString) => setInvoiceData({ ...invoiceData, issueDate: dateString })}
                          />
                        </DashedBox>
                        <DashedBox>
                          <Text strong>Due date (Optional)</Text>
                          <DatePicker
                            style={{ width: "100%", marginTop: 8 }}
                            onChange={(_, dateString) => setInvoiceData({ ...invoiceData, dueDate: dateString })}
                          />
                        </DashedBox>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* From / To */}
              <Row gutter={16}>
                <Col span={12}>
                  <DashedBox>
                    <Text strong>From</Text>
                    <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                      <Input
                        prefix={<BankOutlined />}
                        placeholder="Sender name"
                        onChange={(e) => setInvoiceData({ ...invoiceData, fromName: e.target.value })}
                      />
                      <TextArea
                        placeholder="Sender contact details"
                        rows={2}
                        onChange={(e) => setInvoiceData({ ...invoiceData, fromContact: e.target.value })}
                      />
                    </Space>
                  </DashedBox>
                </Col>
                <Col span={12}>
                  <DashedBox>
                    <Text strong>To</Text>
                    <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Recipient name"
                        onChange={(e) => setInvoiceData({ ...invoiceData, toName: e.target.value })}
                      />
                      <TextArea
                        placeholder="Recipient contact details"
                        rows={2}
                        onChange={(e) => setInvoiceData({ ...invoiceData, toContact: e.target.value })}
                      />
                    </Space>
                  </DashedBox>
                </Col>
              </Row>

              {/* Items Table */}
              <DashedBox>
                <InvoiceItemsTable onChange={updateItems} />
              </DashedBox>
            </div>
          </Col>

          {/* Right section - action buttons */}
          <Col span={6}>
            <div style={{ padding: 24, background: "#f9f9f9", borderRadius: 8 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ width: "100%" }}>
                  Print
                </Button>
              </Space>

              <Divider />

              <div style={{ lineHeight: 2 }}>
                <Text strong>Subtotal:</Text> <span>Rp {invoiceData.subtotal.toLocaleString()}</span> <br />
                <Text strong>Discount:</Text> <span>- Rp {invoiceData.discount.toLocaleString()}</span> <br />
                <Text strong>Tax:</Text> <span>+ Rp {invoiceData.vat.toLocaleString()}</span> <br />
                <Divider style={{ margin: "8px 0" }} />
                <Text strong>Total:</Text> <span>Rp {invoiceData.total.toLocaleString()}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvoiceForm;
