"use client";

import React from "react";
import { Typography, Divider, Table, Row, Col } from "antd";

const { Title, Text } = Typography;

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

const InvoicePrintPreview: React.FC<InvoicePrintPreviewProps> = ({
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
  const columns = [
    {
      title: <span style={{ color: "#1677ff", fontWeight: 600 }}>Description</span>,
      dataIndex: "description",
      key: "desc",
    },
    {
      title: <span style={{ color: "#1677ff", fontWeight: 600 }}>Qty</span>,
      dataIndex: "quantity",
      key: "qty",
      align: "center" as const,
    },
    {
      title: <span style={{ color: "#1677ff", fontWeight: 600 }}>Price</span>,
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      render: (p: number) => `Rp ${p.toLocaleString("id-ID")}`,
    },
    {
      title: <span style={{ color: "#1677ff", fontWeight: 600 }}>Total</span>,
      key: "total",
      align: "right" as const,
      render: (_: any, record: Item) =>
        `Rp ${(record.price * record.quantity).toLocaleString("id-ID")}`,
    },
  ];

  return (
    <div
      className="print-preview"
      style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#fff",
        padding: 40,
        fontFamily: "Segoe UI, sans-serif",
        color: "#333",
        borderRadius: 10,
        // boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        // border: "1px solid #e5e5e5",
      }}
    >
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: 80, objectFit: "contain" }}
            />
          )}
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Title level={3} style={{ color: "#1677ff", marginBottom: 0 }}>
            {invoiceType}
          </Title>
          <Text>Invoice No: {invoiceNumber}</Text><br />
          <Text>Invoice Date: {issueDate}</Text><br />
            {dueDate && <Text>Due: {dueDate}</Text>}
        </Col>
      </Row>

      <Divider style={{ borderColor: "#1677ff" }} />

      {/* From / To */}
      <Row gutter={32} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Title level={5} style={{ color: "#52c41a" }}>From</Title>
          <Text>{fromName}</Text><br />
          <Text>{fromContact}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={{ color: "#fa8c16" }}>To</Title>
          <Text>{toName}</Text><br />
          <Text>{toContact}</Text>
        </Col>
      </Row>

      {/* Items */}
      <Table
        dataSource={items}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
        size="middle"
        style={{ borderColor: "#d9d9d9" }}
      />

      {/* Summary */}
      <div style={{ marginTop: 32, textAlign: "right", lineHeight: 2 }}>
        <Text style={{ color: "#999" }}>Subtotal: Rp {subtotal.toLocaleString("id-ID")}</Text><br />
        <Text style={{ color: "#999" }}>Discount: - Rp {discount.toLocaleString("id-ID")}</Text><br />
        <Text style={{ color: "#999" }}>Tax: + Rp {vat.toLocaleString("id-ID")}</Text>
        <Divider style={{ margin: "12px 0", borderColor: "#1677ff" }} />
        <Title level={3} style={{ color: "#1677ff", fontWeight: 700 }}>
          Total: Rp {total.toLocaleString("id-ID")}
        </Title>
      </div>
    </div>
  );
};

export default InvoicePrintPreview;
