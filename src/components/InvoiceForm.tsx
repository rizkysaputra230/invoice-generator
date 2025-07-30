"use client";

import React, { useRef, useState } from "react";
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
import InvoiceItemsTable from "./InvoiceItemsTable";
import html2pdf from "html2pdf.js";

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

  const handlePDF = () => {
    if (!printRef.current) return;
    html2pdf()
      .set({ margin: 0.5, filename: "invoice.pdf", html2canvas: { scale: 2 } })
      .from(printRef.current)
      .save();
  };

  return (
    <Row gutter={24}>
      {/* Left section - main form */}
      <Col span={18}>
        <div style={{ padding: 24, background: "#fff" }} ref={printRef}>
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
                    <Select defaultValue="Invoice" style={{ width: "100%", marginTop: 8 }}>
                      <Option value="Invoice">Invoice</Option>
                      <Option value="Quote">Quote</Option>
                    </Select>
                  </DashedBox>
                </Col>
                <Col span={8}>
                  <DashedBox>
                    <Text strong>Number</Text>
                    <Input defaultValue="0001" style={{ marginTop: 8 }} />
                  </DashedBox>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <DashedBox>
                      <Text strong>Issue date</Text>
                      <DatePicker style={{ width: "100%", marginTop: 8 }} />
                    </DashedBox>
                    <DashedBox>
                      <Text strong>Due date</Text>
                      <DatePicker style={{ width: "100%", marginTop: 8 }} />
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
                  <Input prefix={<BankOutlined />} placeholder="Sender name" />
                  <TextArea placeholder="Sender contact details" rows={2} />
                </Space>
              </DashedBox>
            </Col>
            <Col span={12}>
              <DashedBox>
                <Text strong>To</Text>
                <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                  <Input prefix={<UserOutlined />} placeholder="Recipient name" />
                  <TextArea placeholder="Recipient contact details" rows={2} />
                </Space>
              </DashedBox>
            </Col>
          </Row>

          {/* Items Table */}
          <DashedBox>
            <InvoiceItemsTable />
          </DashedBox>
        </div>
      </Col>

      {/* Right section - action buttons */}
      <Col span={6}>
        <div style={{ padding: 24, background: "#f9f9f9", borderRadius: 8 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={<EyeOutlined />}
              onClick={handlePreview}
              style={{ width: "100%" }}
            >
              Preview
            </Button>
            <Button
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              style={{ width: "100%" }}
            >
              Print
            </Button>
            <Button
              icon={<FilePdfOutlined />}
              onClick={handlePDF}
              style={{ width: "100%" }}
            >
              Download PDF
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </Space>

          <Divider />

          {/* You can place a summary box here */}
          <div style={{ lineHeight: 2 }}>
            <Text strong>Subtotal:</Text> <span>Rp 0</span> <br />
            <Text strong>Discount:</Text> <span>- Rp 0</span> <br />
            <Text strong>VAT:</Text> <span>+ Rp 0</span> <br />
            <Divider style={{ margin: "8px 0" }} />
            <Text strong>Total:</Text> <span>Rp 0</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default InvoiceForm;
