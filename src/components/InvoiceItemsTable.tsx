// InvoiceItemsTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Divider,
  Typography,
  Select,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Item {
  key: string;
  item: string;
  description: string;
  qty: number;
  price: number;
}

interface Props {
  onChange: (items: Item[], discount: number, vat: number) => void;
}

const InvoiceItemsTable: React.FC<Props> = ({ onChange }) => {
  const [items, setItems] = useState<Item[]>([
    { key: "1", item: "", description: "", qty: 1, price: 0 },
  ]);
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percent" | "nominal">("percent");
  const [vat, setVat] = useState<number>(0); // percentage

  const handleChange = (value: any, key: string, column: keyof Item) => {
    const updated = items.map((item) =>
      item.key === key ? { ...item, [column]: value } : item
    );
    setItems(updated);
  };

  const handleAdd = () => {
    const newItem = {
      key: Date.now().toString(),
      item: "",
      description: "",
      qty: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (key: string) => {
    setItems(items.filter((item) => item.key !== key));
  };

  const subtotal = items.reduce((total, item) => (total + (item.qty || 0) * (item.price || 0)), 0);

  const discountAmount =
    discountType === "percent"
      ? (subtotal * discount) / 100
      : Math.min(discount, subtotal);

  const vatAmount = ((subtotal - discountAmount) * vat) / 100;
  const total = subtotal - discountAmount + vatAmount;

  // 🔄 Sync ke parent
  useEffect(() => {
    onChange(items, discountAmount, vatAmount);
  }, [items, discount, vat]);

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      render: (_: any, record: Item) => (
        <Input value={record.item} onChange={(e) => handleChange(e.target.value, record.key, "item")} />
      ),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   render: (_: any, record: Item) => (
    //     <Input value={record.description} onChange={(e) => handleChange(e.target.value, record.key, "description")} />
    //   ),
    // },
    {
      title: "Qty",
      dataIndex: "qty",
      width: 240,
      render: (_: any, record: Item) => (
        <InputNumber style={{ width: "100%" }} min={1} value={record.qty} onChange={(val) => handleChange(val, record.key, "qty")} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 240,
      render: (_: any, record: Item) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          formatter={(val) => `Rp ${val}`}
          parser={(val) => val?.replace(/[^\d]/g, "") || ""}
          value={record.price}
          onChange={(val) => handleChange(val, record.key, "price")}
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: 120,
      render: (_: any, record: Item) => (
        <Text>Rp {(record.qty * record.price).toLocaleString("id-ID")}</Text>
      ),
    },
    {
      title: "",
      width: 40,
      render: (_: any, record: Item) => (
        <Button danger type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        summary={() => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right"><Text strong>Subtotal</Text></Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>Rp {subtotal.toLocaleString("id-ID")}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right">
                <Space>
                  <Text strong>Discount</Text>
                  <Select value={discountType} onChange={(val) => setDiscountType(val)} style={{ width: 80 }}>
                    <Select.Option value="percent">%</Select.Option>
                    <Select.Option value="nominal">Rp</Select.Option>
                  </Select>
                  <InputNumber style={{ width: 224 }} min={0} value={discount} onChange={(val) => setDiscount(val || 0)} />
                </Space>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>- Rp {discountAmount.toLocaleString("id-ID")}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right">
                <Space>
                  <Text strong>Tax (%)</Text>
                  <InputNumber style={{ width: 224 }} min={0} max={100} value={vat} onChange={(val) => setVat(val || 0)} />
                </Space>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>+ Rp {vatAmount.toLocaleString("id-ID")}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} align="right"><Text strong>Total</Text></Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>
                <Text strong style={{ color: "#1677ff" }}>Rp {total.toLocaleString("id-ID")}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
      />
      <Divider />
      <Row justify="start">
        <Col>
          <Button icon={<PlusOutlined />} type="dashed" onClick={handleAdd}>Add Item</Button>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceItemsTable;
