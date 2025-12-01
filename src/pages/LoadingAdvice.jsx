import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  DatePicker,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const loadingAdviceJSON = {
  initialData: [
    {
      key: 1,
      adviceNo: "LA-2025-001",
      adviceDate: "2025-11-20",
      poNo: "PO-2025-001",
      wayBill: "WB123",
      status: "Pending",
      vendorName: "Global Suppliers Co.",
      vendorAddress: "456 Commerce St, NY",
      vendorGSTIN: "GSTEB001",
      vendorContactPerson: "Alice Johnson",
      vendorPhoneNumber: "9876543210",
      plantName: "Manufacturing Hub 1",
      plantCode: "P-MH1",
      plantGSTIN: "GSTMA001",
      plantAddress: "123 Industrial Rd, CA",
      plantContactPerson: "Bob Williams",
      plantPhoneNumber: "0123456789",
      vehicleNo: "MH12AB4567",
      driverName: "Ram Singh",
      driverContact: "9123456789",
      insuranceValidUpto: "2026-05-20",
      puValidUpto: "2026-06-01",
      fitnessValidUpto: "2026-07-15",
      vehicleInTime: "10:00",
      vehicleOutTime: "11:30",
      tareWeights: 5000,
      netWeight: 4500,
      grossWeights: 9500,
      items: [
        {
          key: "item-1",
          slNo: 1,
          itemCode: "ITEM-001",
          itemDescription: "Raw Material X",
          reqQty: 1000,
          actualQty: 950,
          variance: -50,
          uom: "Kgs",
        },
        {
          key: "item-2",
          slNo: 2,
          itemCode: "ITEM-002",
          itemDescription: "Component A",
          reqQty: 500,
          actualQty: 500,
          variance: 0,
          uom: "Pcs",
        },
      ],
    },
    {
      key: 2,
      adviceNo: "LA-2025-002",
      adviceDate: "2025-11-22",
      poNo: "PO-2025-002",
      wayBill: "WB456",
      status: "Completed",
      vendorName: "Local Steel Traders",
      vendorAddress: "789 Main Ave, TX",
      vendorGSTIN: "GSTLT002",
      vendorContactPerson: "Charles Davis",
      vendorPhoneNumber: "9988776655",
      plantName: "Assembly Unit 2",
      plantCode: "P-AU2",
      plantGSTIN: "GSTAS002",
      plantAddress: "55 Logistics Pkwy, FL",
      plantContactPerson: "Diana Prince",
      plantPhoneNumber: "0987654321",
      vehicleNo: "DL05CD9876",
      driverName: "Gopal Varma",
      driverContact: "9222333444",
      insuranceValidUpto: "2026-01-01",
      puValidUpto: "2026-02-01",
      fitnessValidUpto: "2026-03-01",
      vehicleInTime: "08:00",
      vehicleOutTime: "09:30",
      tareWeights: 3000,
      netWeight: 2500,
      grossWeights: 5500,
      items: [
        {
          key: "item-1",
          slNo: 1,
          itemCode: "ITEM-003",
          itemDescription: "Steel Bars",
          reqQty: 800,
          actualQty: 800,
          variance: 0,
          uom: "Kgs",
        },
      ],
    },
  ],
  statusOptions: ["Pending", "In Progress", "Completed", "Cancelled"],
  uomOptions: ["Kgs", "Pcs", "Ltrs", "Tons", "Meters"],
};

export default function LoadingAdvice() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(loadingAdviceJSON.initialData);
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);

  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const filteredData = data.filter(
    (item) =>
      item.adviceNo?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.poNo?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.vendorName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.plantName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFormSubmit = () => {
    editForm.validateFields().then((values) => {
      const currentRecord = selectedRecord;

      const payload = {
        ...currentRecord,
        ...values,
        items: items,
        adviceDate: values.adviceDate?.format("YYYY-MM-DD"),
        insuranceValidUpto: values.insuranceValidUpto?.format("YYYY-MM-DD"),
        puValidUpto: values.puValidUpto?.format("YYYY-MM-DD"),
        fitnessValidUpto: values.fitnessValidUpto?.format("YYYY-MM-DD"),
      };

      setData((prev) =>
        prev.map((item) =>
          item.key === currentRecord.key ? { ...payload, key: item.key } : item
        )
      );

      setIsEditModalOpen(false);
      setSelectedRecord(null);
      setItems([]);
    });
  };

  const getStatusClasses = (status) => {
    const base = "px-3 py-1 rounded-full font-semibold inline-block text-sm";

    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "In Progress":
        return `${base} bg-blue-100 text-blue-700`;
      case "Completed":
        return `${base} bg-green-100 text-green-700`;
      case "Cancelled":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const mapRecordToFormValues = (record) => {
    if (!record) return {};
    return {
      ...record,
      adviceDate: record.adviceDate
        ? dayjs(record.adviceDate, "YYYY-MM-DD")
        : null,
      insuranceValidUpto: record.insuranceValidUpto
        ? dayjs(record.insuranceValidUpto, "YYYY-MM-DD")
        : null,
      puValidUpto: record.puValidUpto
        ? dayjs(record.puValidUpto, "YYYY-MM-DD")
        : null,
      fitnessValidUpto: record.fitnessValidUpto
        ? dayjs(record.fitnessValidUpto, "YYYY-MM-DD")
        : null,
    };
  };

  const addNewItem = () => {
    const newItem = {
      key: `item-${Date.now()}`,
      slNo: items.length + 1,
      itemCode: "",
      itemDescription: "",
      reqQty: 0,
      actualQty: 0,
      variance: 0,
      uom: "Kgs",
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (key) => {
    const updatedItems = items.filter((item) => item.key !== key);
    // Renumber SL No
    const renumberedItems = updatedItems.map((item, index) => ({
      ...item,
      slNo: index + 1,
    }));
    setItems(renumberedItems);
  };

  const updateItem = (key, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.key === key) {
        const updatedItem = { ...item, [field]: value };
        
        // Calculate variance when actualQty or reqQty changes
        if (field === "actualQty" || field === "reqQty") {
          const actualQty = field === "actualQty" ? parseFloat(value) || 0 : parseFloat(item.actualQty) || 0;
          const reqQty = field === "reqQty" ? parseFloat(value) || 0 : parseFloat(item.reqQty) || 0;
          updatedItem.variance = actualQty - reqQty;
        }
        
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Advice No</span>,
      dataIndex: "adviceNo",
      render: (text) => <span className="text-amber-800 font-medium">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">PO No</span>,
      dataIndex: "poNo",
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Advice Date</span>,
      dataIndex: "adviceDate",
      render: (text) => (
        <span className="text-amber-800">
          {dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: <span className="text-amber-700 font-semibold">Vendor</span>,
      dataIndex: "vendorName",
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Plant</span>,
      dataIndex: "plantName",
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Vehicle No</span>,
      dataIndex: "vehicleNo",
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Status</span>,
      dataIndex: "status",
      render: (status) => {
        return <span className={getStatusClasses(status)}>{status}</span>;
      },
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500 hover:text-blue-700 text-lg"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue(mapRecordToFormValues(record));
              setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500 hover:text-red-700 text-lg"
            onClick={() => {
              setSelectedRecord(record);
              setItems(record.items || []);
              editForm.setFieldsValue(mapRecordToFormValues(record));
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const renderVendorPlantDetails = (disabled = false) => {
    return (
      <>
        <div className="text-base font-semibold m-0 text-amber-600 mb-3">
          Vendor Details
        </div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="Vendor Name"
              name="vendorName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Address"
              name="vendorAddress"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="GSTIN"
              name="vendorGSTIN"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Contact Person"
              name="vendorContactPerson"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Phone Number"
              name="vendorPhoneNumber"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-base font-semibold m-0 text-amber-600 mb-3 mt-4">
          Plant Details
        </div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="Plant Name"
              name="plantName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Plant Code"
              name="plantCode"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="GSTIN"
              name="plantGSTIN"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Address"
              name="plantAddress"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Contact Person"
              name="plantContactPerson"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Phone Number"
              name="plantPhoneNumber"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const renderTransportAndLoadingDetails = (disabled = false) => {
    return (
      <>
        <div className="text-base font-semibold m-0 text-amber-600 mb-3 mt-4">
          Transport Details
        </div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="Vehicle No."
              name="vehicleNo"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Driver Name"
              name="driverName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Driver Contact"
              name="driverContact"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Insurance Valid Upto"
              name="insuranceValidUpto"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                className="w-full"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="PU Valid Upto"
              name="puValidUpto"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                className="w-full"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Fitness Valid Upto"
              name="fitnessValidUpto"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                className="w-full"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-base font-semibold m-0 text-amber-600 mb-3 mt-4">
          Loading Details
        </div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="Vehicle In Time"
              name="vehicleInTime"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} placeholder="HH:MM" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Vehicle Out Time"
              name="vehicleOutTime"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input disabled={disabled} placeholder="HH:MM" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tare Weight (KGs)"
              name="tareWeights"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="number" disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Net Weight (KGs)"
              name="netWeight"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="number" disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Gross Weight (KGs)"
              name="grossWeights"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="number" disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const renderItemsTable = (disabled = false) => {
    const itemColumns = [
      {
        title: "SL No.",
        dataIndex: "slNo",
        width: 80,
        render: (text) => <span className="font-medium">{text}</span>,
      },
      {
        title: "Item Code",
        dataIndex: "itemCode",
        width: 150,
        render: (text, record) =>
          disabled ? (
            <span>{text}</span>
          ) : (
            <Input
              value={text}
              onChange={(e) =>
                updateItem(record.key, "itemCode", e.target.value)
              }
              placeholder="Enter item code"
            />
          ),
      },
      {
        title: "Item Description",
        dataIndex: "itemDescription",
        width: 200,
        render: (text, record) =>
          disabled ? (
            <span>{text}</span>
          ) : (
            <Input
              value={text}
              onChange={(e) =>
                updateItem(record.key, "itemDescription", e.target.value)
              }
              placeholder="Enter description"
            />
          ),
      },
      {
        title: "Required Qty",
        dataIndex: "reqQty",
        width: 120,
        render: (text, record) =>
          disabled ? (
            <span>{text}</span>
          ) : (
            <Input
              type="number"
              value={text}
              onChange={(e) =>
                updateItem(record.key, "reqQty", e.target.value)
              }
              placeholder="0"
            />
          ),
      },
      {
        title: "Actual Qty",
        dataIndex: "actualQty",
        width: 120,
        render: (text, record) =>
          disabled ? (
            <span>{text}</span>
          ) : (
            <Input
              type="number"
              value={text}
              onChange={(e) =>
                updateItem(record.key, "actualQty", e.target.value)
              }
              placeholder="0"
            />
          ),
      },
      {
        title: "Variance",
        dataIndex: "variance",
        width: 100,
        render: (text) => (
          <span
            className={`font-semibold ${
              text < 0 ? "text-red-600" : text > 0 ? "text-green-600" : ""
            }`}
          >
            {text}
          </span>
        ),
      },
      {
        title: "UOM",
        dataIndex: "uom",
        width: 120,
        render: (text, record) =>
          disabled ? (
            <span>{text}</span>
          ) : (
            <Select
              value={text}
              onChange={(value) => updateItem(record.key, "uom", value)}
              options={loadingAdviceJSON.uomOptions.map((uom) => ({
                label: uom,
                value: uom,
              }))}
              className="w-full"
            />
          ),
      },
    ];

    if (!disabled) {
      itemColumns.push({
        title: "Action",
        width: 80,
        render: (record) => (
          <DeleteOutlined
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => deleteItem(record.key)}
          />
        ),
      });
    }

    const dataSource = disabled ? selectedRecord?.items || [] : items;

    return (
      <>
        <div className="flex justify-between items-center mb-3 mt-4">
          <div className="text-base font-semibold text-amber-600">
            Item Details
          </div>
          {!disabled && (
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addNewItem}
              className="border-amber-400 text-amber-700 hover:bg-amber-50"
            >
              Add Item
            </Button>
          )}
        </div>
        <Table
          columns={itemColumns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1200 }}
          rowKey="key"
          bordered
          size="small"
        />
      </>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Loading Advice</h1>
          <p className="text-amber-600">
            Manage loading advice and transport details
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined className="text-amber-600" />}
            placeholder="Search Advice No, PO, Vendor..."
            className="w-64 border-amber-300 focus:border-amber-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            icon={<FilterOutlined />}
            onClick={() => setSearchText("")}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
          >
            Reset
          </Button>

          <Button
            icon={<DownloadOutlined />}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
          >
            Export
          </Button>
        </div>
      </div>

      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ y: 600 }}
          rowKey="key"
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title={
          <span className="text-amber-700 font-semibold">
            Edit Loading Advice
          </span>
        }
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setItems([]);
        }}
        footer={null}
        width={1400}
      >
        <Form layout="vertical" form={editForm} onFinish={handleFormSubmit}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Advice No" name="adviceNo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Advice Date"
                name="adviceDate"
                rules={[{ required: true, message: "Required" }]}
              >
                <DatePicker format="DD-MM-YYYY" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="PO No" name="poNo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Way Bill"
                name="wayBill"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select
                  options={loadingAdviceJSON.statusOptions.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          {renderVendorPlantDetails(false)}
          {renderTransportAndLoadingDetails(false)}
          {renderItemsTable(false)}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsEditModalOpen(false);
                setItems([]);
              }}
              className="border-amber-400 text-amber-700 hover:bg-amber-100"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 hover:bg-amber-600 border-none"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            View Loading Advice
          </span>
        }
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={1400}
      >
        <Form layout="vertical" form={viewForm}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Advice No" name="adviceNo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Advice Date" name="adviceDate">
                <DatePicker format="DD-MM-YYYY" className="w-full" disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="PO No" name="poNo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Way Bill" name="wayBill">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Status" name="status">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          {renderVendorPlantDetails(true)}
          {renderTransportAndLoadingDetails(true)}
          {renderItemsTable(true)}
        </Form>
      </Modal>
    </div>
  );
}