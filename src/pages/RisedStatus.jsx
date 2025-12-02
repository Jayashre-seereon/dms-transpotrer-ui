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
  Divider,
  Select,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// (poJSON kept same as you provided — not repeated here to save space)

const poJSON = {
  initialData: [
    {
      key: 1,
      orderNo: "PO-2025-001",
      orderDate: "2025-10-01",
      wayBill: "WB123",
      estimateDeliveryDate: "2025-10-15",
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
      // product fields converted into an array to support multiple products
      products: [
        {
          productId: "PROD-A",
          productName: "Raw Material X",
          requiredQty: 1000,
          actualQty: 0,
          variance: 1000,
          uom: "Kgs"
        },
         {
          productId: "PROD-B",
          productName: "Raw Material Y",
          requiredQty: 1200,
          actualQty: 2,
          variance: 100,
          uom: "Kgs"
        }
      ],
      vehicleNo: "",
      driverName: "",
      driverContact: "",
      insuranceValidUpto: "",
      puValidUpto: "",
      fitnessValidUpto: "",
      vehicleInTime: "",
      vehicleOutTime: "",
      tareWeights: 0,
      netWeight: 0,
      grossWeights: 0
    },
    {
      key: 2,
      orderNo: "PO-2025-002",
      orderDate: "2025-10-05",
      wayBill: "WB123",
      estimateDeliveryDate: "2025-10-20",
      status: "Approved",
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
      products: [
        {
          productId: "PROD-B",
          productName: "Component Y",
          requiredQty: 500,
          actualQty: 500,
          variance: 0,
          uom: "Pcs"
        }
      ],
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
      grossWeights: 9500
    },
    {
      key: 3,
      orderNo: "PO-2025-003",
      orderDate: "2025-11-01",
      wayBill: "WB123",
      estimateDeliveryDate: "2025-11-10",
      status: "Out for Delivery",
      vendorName: "Chemicals Inc.",
      vendorAddress: "101 Lab Lane, MA",
      vendorGSTIN: "GSTCI003",
      vendorContactPerson: "Eve Fisher",
      vendorPhoneNumber: "9000111222",
      plantName: "Storage Facility 3",
      plantCode: "P-SF3",
      plantGSTIN: "GSTSF003",
      plantAddress: "22 Dockyard Rd, WA",
      plantContactPerson: "Frank Green",
      plantPhoneNumber: "0444555666",
      products: [
        {
          productId: "PROD-C",
          productName: "Solvent Z",
          requiredQty: 200,
          actualQty: 200,
          variance: 0,
          uom: "Ltrs"
        }
      ],
      vehicleNo: "DL05CD9876",
      driverName: "Gopal Varma",
      driverContact: "9222333444",
      insuranceValidUpto: "2026-01-01",
      puValidUpto: "2026-02-01",
      fitnessValidUpto: "2026-03-01",
      vehicleInTime: "08:00",
      vehicleOutTime: "09:00",
      tareWeights: 3000,
      netWeight: 2000,
      grossWeights: 5000
    },
    {
      key: 4,
      orderNo: "PO-2025-004",
      orderDate: "2025-11-10",
      wayBill: "WB123",
      estimateDeliveryDate: "2025-11-25",
      status: "Assigned",
      vendorName: "Polymer Supplies",
      vendorAddress: "321 Plastics Way, IL",
      vendorGSTIN: "GSTPS004",
      vendorContactPerson: "George Harris",
      vendorPhoneNumber: "9333444555",
      plantName: "Processing Center 4",
      plantCode: "P-PC4",
      plantGSTIN: "GSTPC004",
      plantAddress: "88 Chemical Blvd, NV",
      plantContactPerson: "Helen Miller",
      plantPhoneNumber: "0555666777",
      products: [
        {
          productId: "PROD-D",
          productName: "Polymer Pellets",
          requiredQty: 750,
          actualQty: 750,
          variance: 0,
          uom: "Kgs"
        }
      ],
      vehicleNo: "KA01FG1122",
      driverName: "Irfan Khan",
      driverContact: "9444555666",
      insuranceValidUpto: "2026-08-01",
      puValidUpto: "2026-09-01",
      fitnessValidUpto: "2026-10-01",
      vehicleInTime: "14:00",
      vehicleOutTime: "15:00",
      tareWeights: 4000,
      netWeight: 3500,
      grossWeights: 7500
    }
  ],
  statusOptions: [
    "Pending",
    "Assigned",
    "Approved",
    "In Transit",
    "Out for Delivery",
    "Delivered"
  ]
};


// --- 2. MAIN COMPONENT ---
export default function PurchaseOrderList() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(poJSON.initialData);
  const [searchText, setSearchText] = useState("");

  const [editForm] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const filteredData = data.filter(
    (item) =>
      item.orderNo?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.vendorName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.plantName?.toLowerCase().includes(searchText.toLowerCase()) ||
      // NOTE: productName was a top-level field previously; when using products array,
      // mapRecordToFormValues will populate top-level productName for backward compatibility
      (item.productName || "")
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchText.toLowerCase())
  );

  // -----------------------------
  // Map record -> form initial values
  // ensures `products` exists (backwards compatible)
  // -----------------------------
  const mapRecordToFormValues = (record) => {
    if (!record) return {};
    // Ensure products array exists. If legacy single-product keys exist, create products array
    let products = [];
    if (Array.isArray(record.products) && record.products.length) {
      products = record.products.map((p) => ({ ...p }));
    } else if (record.productId || record.productName) {
      // legacy shape -> transform into products array
      products = [
        {
          productId: record.productId || "",
          productName: record.productName || "",
          requiredQty: record.requiredQty ?? 0,
          actualQty: record.actualQty ?? 0,
          variance: record.variance ?? 0,
          uom: record.uom || "",
        },
      ];
    } else {
      // default single empty product so form can render
      products = [
        {
          productId: "",
          productName: "",
          requiredQty: 0,
          actualQty: 0,
          variance: 0,
          uom: "",
        },
      ];
    }

    return {
      ...record,
      products,
      // convert dates to dayjs objects for DatePicker fields
      orderDate: record.orderDate ? dayjs(record.orderDate, "YYYY-MM-DD") : null,
      estimateDeliveryDate: record.estimateDeliveryDate ? dayjs(record.estimateDeliveryDate, "YYYY-MM-DD") : null,
      insuranceValidUpto: record.insuranceValidUpto ? dayjs(record.insuranceValidUpto, "YYYY-MM-DD") : null,
      puValidUpto: record.puValidUpto ? dayjs(record.puValidUpto, "YYYY-MM-DD") : null,
      fitnessValidUpto: record.fitnessValidUpto ? dayjs(record.fitnessValidUpto, "YYYY-MM-DD") : null,
    };
  };

  // -----------------------------
  // Submit handler: compute per-product variance and update record
  // -----------------------------
  const handleFormSubmit = (values, isAssign) => {
    // choose form instance (assign vs edit)
    const formInstance = isAssign ? assignForm : editForm;
    const fields = formInstance.getFieldsValue(true);
    const currentRecord = selectedRecord;

    let newStatus = currentRecord.status;
    if (isAssign) {
      newStatus = "Assigned";
    } else if (fields.status) {
      newStatus = fields.status;
    }

    // Ensure fields.products exists and compute per-product variance
    const productsFromForm = Array.isArray(fields.products) ? fields.products : [];
    const computedProducts = productsFromForm.map((p) => {
      const requiredQty = parseFloat(p.requiredQty) || 0;
      const actualQty = parseFloat(p.actualQty) || 0;
      return {
        ...p,
        requiredQty,
        actualQty,
        variance: actualQty - requiredQty,
      };
    });

    // Build payload — keep other top-level props unchanged where not provided
    const payload = {
      ...currentRecord,
      ...fields,
      products: computedProducts,
      status: newStatus,
      orderDate: fields.orderDate?.format("YYYY-MM-DD"),
      estimateDeliveryDate: fields.estimateDeliveryDate?.format("YYYY-MM-DD"),
      insuranceValidUpto: fields.insuranceValidUpto ? fields.insuranceValidUpto.format("YYYY-MM-DD") : "",
      puValidUpto: fields.puValidUpto ? fields.puValidUpto.format("YYYY-MM-DD") : "",
      fitnessValidUpto: fields.fitnessValidUpto ? fields.fitnessValidUpto.format("YYYY-MM-DD") : "",
    };

    // Keep backward compatibility: update top-level product fields from the first product
    if (computedProducts.length) {
      payload.productId = computedProducts[0].productId;
      payload.productName = computedProducts[0].productName;
      payload.requiredQty = computedProducts[0].requiredQty;
      payload.actualQty = computedProducts[0].actualQty;
      payload.variance = computedProducts[0].variance;
      payload.uom = computedProducts[0].uom;
    }

    setData((prev) =>
      prev.map((item) => (item.key === currentRecord.key ? { ...payload, key: item.key } : item))
    );

    setIsAssignModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  const getStatusClasses = (status) => {
    const base = "px-3 py-1 rounded-full font-semibold inline-block";
    const isModalFooter = status === selectedRecord?.status && (isViewModalOpen || isEditModalOpen || isAssignModalOpen);
    const modalBase = `${base} ${isModalFooter ? "text-xl p-3 shadow-md" : "text-sm"}`;

    switch (status) {
      case "Pending":
        return `${modalBase} bg-yellow-100 text-yellow-700`;
      case "Assigned":
        return `${modalBase} bg-blue-100 text-blue-700`;
      case "Approved":
        return `${modalBase} bg-green-100 text-green-700`;
      case "In Transit":
        return `${modalBase} bg-indigo-100 text-indigo-700`;
      case "Out for Delivery":
        return `${modalBase} bg-purple-100 text-purple-700`;
      case "Delivered":
        return `${modalBase} bg-teal-100 text-teal-700`;
      default:
        return `${modalBase} bg-gray-100 text-gray-700`;
    }
  };

  // *** CORRECTED FUNCTION TO FILTER STATUS OPTIONS ***
  const getEditableStatusOptions = (currentStatus, allOptions) => {
    switch (currentStatus) {
      case "Pending":
        return allOptions.filter((status) => ["Assigned", "Approved"].includes(status));
      case "Assigned":
        return allOptions.filter((status) => ["Approved", "In Transit", "Out for Delivery"].includes(status));
      case "Approved":
        return allOptions.filter((status) => ["In Transit", "Out for Delivery"].includes(status));
      case "In Transit":
        return allOptions.filter((status) => ["Out for Delivery", "Delivered"].includes(status));
      case "Out for Delivery":
        return allOptions.filter((status) => ["Delivered"].includes(status));
      case "Delivered":
        return [currentStatus];
      default:
        return [currentStatus];
    }
  };

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Order No</span>,
      dataIndex: "orderNo",
      render: (text) => <span className="text-amber-800 font-medium">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Vendor</span>,
      dataIndex: "vendorName",
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Order Date</span>,
      dataIndex: "orderDate",
      render: (text) => <span className="text-amber-800">{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Est. Delivery</span>,
      dataIndex: "estimateDeliveryDate",
      render: (text) => <span className="text-amber-800">{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Plant</span>,
      dataIndex: "plantName",
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
            className="cursor-pointer! text-blue-500! hover:text-blue-700! text-lg!"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue(mapRecordToFormValues(record));
              setIsViewModalOpen(true);
            }}
          />
          {record.status !== "Pending" && (
            <EditOutlined
              className="cursor-pointer! text-red-500! hover:text-red-700! text-lg!"
              onClick={() => {
                setSelectedRecord(record);
                editForm.setFieldsValue(mapRecordToFormValues(record));
                setIsEditModalOpen(true);
              }}
            />
          )}
        </div>
      ),
    },
    {
      title: <span className="text-amber-700 font-semibold">Assign</span>,
      render: (record) =>
        record.status === "Pending" ? (
          <Button
            icon={<TruckOutlined />}
            size="small"
            className=" text-amber-500! border-amber-500! hover:bg-amber-500! hover:text-white! font-semibold!"
            onClick={() => {
              setSelectedRecord(record);
              assignForm.resetFields();
              assignForm.setFieldsValue(mapRecordToFormValues(record));
              setIsAssignModalOpen(true);
            }}
          >
            Assign
          </Button>
        ) : (
          <span className={"text-green-600 font-semibold"}>Assigned</span>
        ),
    },
  ];

  // -----------------------------
  // Product rendering: uses Form.List so multiple products are supported.
  // Only this block replaces the old single-product Form items.
  // -----------------------------
  const renderProductDetailsFormList = (isPoDetailDisabled, isEdit, isProductQtyDisabled, isUOMDisabled) => {
    // isPoDetailDisabled - disables most PO detail fields
    // isEdit - whether we're in Edit mode (so some fields editable depending on status)
    // isProductQtyDisabled / isUOMDisabled - additional rules from your original logic

    return (
      <>
        <div className="text-base! font-semibold! m-0! text-amber-600!">Product Details</div>

        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Row gutter={24} key={field.key} align="middle" className={index === 0 ? "" : "mt-2"}>
                  <Col span={6}>
                    <Form.Item
                      label={`Product ID ${fields.length > 1 ? `(#${index + 1})` : ""}`}
                      name={[field.name, "productId"]}
                      fieldKey={[field.fieldKey, "productId"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input disabled={isPoDetailDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label={`Product Name ${fields.length > 1 ? `(#${index + 1})` : ""}`}
                      name={[field.name, "productName"]}
                      fieldKey={[field.fieldKey, "productName"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input disabled={isPoDetailDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label="Required Qty"
                      name={[field.name, "requiredQty"]}
                      fieldKey={[field.fieldKey, "requiredQty"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label="UOM"
                      name={[field.name, "uom"]}
                      fieldKey={[field.fieldKey, "uom"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input disabled={isUOMDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label="Actual Qty"
                      name={[field.name, "actualQty"]}
                      fieldKey={[field.fieldKey, "actualQty"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input type="number" disabled={isProductQtyDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label="Variance"
                      name={[field.name, "variance"]}
                      fieldKey={[field.fieldKey, "variance"]}
                    >
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>

                  {/* show add/remove controls only in edit/assign mode (not in view) */}
                  {!isPoDetailDisabled && index === fields.length - 1 && (
                    <Col span={24} className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="small"
                          onClick={() =>
                            add({
                              productId: "",
                              productName: "",
                              requiredQty: 0,
                              actualQty: 0,
                              variance: 0,
                              uom: "",
                            })
                          }
                        >
                          + Add Item
                        </Button>
                        {fields.length > 1 && (
                          <Button size="small" danger onClick={() => remove(field.name)}>
                            Remove Last
                          </Button>
                        )}
                      </div>
                    </Col>
                  )}
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </>
    );
  };

  // re-useable renderAllDetails but product portion replaced by Form.List
  const renderAllDetails = (disabled = false, isEdit = false) => {
    const isPoDetailDisabled = disabled || (isEdit && selectedRecord?.status !== "Pending");
    const isStatusEditable = isEdit && selectedRecord?.status !== "Delivered";
    const currentStatus = selectedRecord?.status;
    let statusOptionsToDisplay = [{ label: currentStatus, value: currentStatus }];

    if (isEdit) {
      const nextStatuses = getEditableStatusOptions(currentStatus, poJSON.statusOptions);

      if (!nextStatuses.includes(currentStatus)) {
        nextStatuses.unshift(currentStatus);
      }

      statusOptionsToDisplay = nextStatuses.map((status) => ({ label: status, value: status }));
    } else {
      statusOptionsToDisplay = [{ label: currentStatus, value: currentStatus }];
    }

    const isProductQtyDisabled = disabled || (isEdit && selectedRecord?.status !== "Out for Delivery" && selectedRecord?.status !== "In Transit");
    const isUOMDisabled = disabled || (isEdit && selectedRecord?.status !== "Out for Delivery" && selectedRecord?.status !== "In Transit");

    return (
      <>
        <div className="text-base! font-semibold! m-0! text-amber-600!">Purchase Order Details</div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Order No" name="orderNo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Order Date" name="orderDate" rules={[{ required: true, message: "Required" }]}>
              <DatePicker format="DD-MM-YYYY" className="w-full" disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Est. Delivery Date" name="estimateDeliveryDate" rules={[{ required: true, message: "Required" }]}>
              <DatePicker format="DD-MM-YYYY" className="w-full" disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Way Bill" name="wayBill" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: "Required" }]}>
              <Select disabled={!isStatusEditable} options={statusOptionsToDisplay} />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-base! font-semibold! m-0! text-amber-600!">Vendor Detail</div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Vendor Name" name="vendorName" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Address" name="vendorAddress" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="GSTIN" name="vendorGSTIN" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Contact Person Name" name="vendorContactPerson" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Phone Number " name="vendorPhoneNumber" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-base! font-semibold! m-0! text-amber-600!">Plant Detail</div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Plant Name" name="plantName" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Plant Code" name="plantCode" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="GSTIN" name="plantGSTIN" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Address" name="plantAddress" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Contact Person" name="plantContactPerson" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Phone Number" name="plantPhoneNumber" rules={[{ required: true, message: "Required" }]}>
              <Input disabled={isPoDetailDisabled} />
            </Form.Item>
          </Col>
        </Row>

        {/* ********* PRODUCT DETAILS - uses Form.List to support multiple items ********* */}
        {renderProductDetailsFormList(isPoDetailDisabled, isEdit, isProductQtyDisabled, isUOMDisabled)}
      </>
    );
  };

  const renderTransportAndLoading = (disabled = false, isEdit = false) => {
    const isTransportLoadingDisabled = disabled || (isEdit && selectedRecord?.status !== "Assigned");

    return (
      <>
        <div className="text-base! font-semibold! m-0! text-amber-600!">Transport Detail</div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Vehicle No." name="vehicleNo" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Driver Name" name="driverName" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Driver Contact" name="driverContact" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Insurance Valid Upto"
              name="insuranceValidUpto"
              rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}
            >
              <DatePicker format="DD-MM-YYYY" className="w-full" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="PU Valid Upto" name="puValidUpto" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <DatePicker format="DD-MM-YYYY" className="w-full" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Fitness Valid Upto" name="fitnessValidUpto" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <DatePicker format="DD-MM-YYYY" className="w-full" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
        </Row>

        {/* <div className="text-base! font-semibold! m-0! text-amber-600!">Loading Details</div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Vehicle In Time" name="vehicleInTime" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Vehicle Out Time" name="vehicleOutTime" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Tare Weights (KGs)" name="tareWeights" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input type="number" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Net Weight (KGs)" name="netWeight" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input type="number" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Gross Weights (KGs)" name="grossWeights" rules={[{ required: !isTransportLoadingDisabled, message: "Required" }]}>
              <Input type="number" disabled={isTransportLoadingDisabled} />
            </Form.Item>
          </Col>
        </Row> */}
      </>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-0">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Orders Assign</h1>
          <p className="text-amber-600">Manage your pending and approved assign requests.</p>
        </div>

        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined className="text-amber-600!" />}
            placeholder="Search PO ID, Vendor, or Status"
            className="w-64! border-amber-300! focus:border-amber-500!"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button icon={<FilterOutlined />} onClick={() => setSearchText("")} className="border-amber-400! text-amber-700! hover:bg-amber-100!">
            Reset
          </Button>

          <Button icon={<DownloadOutlined />} className="border-amber-400! text-amber-700! hover:bg-amber-100!">
            Export
          </Button>
        </div>
      </div>

      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <Table columns={columns} dataSource={filteredData} pagination={false} scroll={{ y: 1300 }} rowKey="key" />
      </div>

      <Modal title={<span className="text-amber-700 font-semibold">Edit Purchase Order</span>} open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null} width={1200}>
        <Form layout="vertical" form={editForm} onFinish={() => editForm.validateFields().then(() => handleFormSubmit(null, false))}>
          <div>
            {selectedRecord?.status !== "Pending" && <>{renderTransportAndLoading(false, true)}</>}
            {renderAllDetails(false, true)}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsEditModalOpen(false)} className="border-amber-400 text-amber-700 hover:bg-amber-100">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-amber-500 hover:bg-amber-600 border-none">
              Update{" "}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal title={<span className="text-amber-700 font-semibold">Assign Transport </span>} open={isAssignModalOpen} onCancel={() => setIsAssignModalOpen(false)} footer={null} width={1200}>
        <Form layout="vertical" form={assignForm} onFinish={() => assignForm.validateFields().then(() => handleFormSubmit(null, true))}>
          <div>
            {renderTransportAndLoading(false, false)}
            {renderAllDetails(true, false)}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsAssignModalOpen(false)} className="border-amber-400 text-amber-700 hover:bg-amber-100">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-amber-500 hover:bg-amber-600 border-none">
              Assign PO
            </Button>
          </div>
        </Form>
      </Modal>

      {/* --- View Modal --- */}
      <Modal title={<span className="text-amber-700 text-2xl font-semibold">View Purchase Order</span>} open={isViewModalOpen} onCancel={() => setIsViewModalOpen(false)} width={1200}>
        <Form layout="vertical" form={viewForm}>
          <div>
            {selectedRecord?.status !== "Pending" && <>{renderTransportAndLoading(true, false)}</>}
            {renderAllDetails(true, false)}
          </div>
        </Form>
      </Modal>
    </div>
  );
}
