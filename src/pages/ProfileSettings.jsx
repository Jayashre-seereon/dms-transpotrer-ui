// ProfileSettings.jsx
import React from "react";
import { Card, Form, Input, Avatar, Button } from "antd";
import { UserOutlined, MailOutlined, TeamOutlined } from "@ant-design/icons";

export default function ProfileSettings() {
  const [form] = Form.useForm();

  const user = {
    name: "John Administrator",
    email: "john.admin@transportcorp.com",
    role: "Operations Manager",
  };

  const onFinish = (values) => {
    const updatedProfileJSON = JSON.stringify(values, null, 2);
    console.log("Updated Profile (JSON):", updatedProfileJSON);
    alert("Updated Profile JSON:\n" + updatedProfileJSON);
  };

  return (
    <div className="p-1">
       <div className="flex justify-between items-center mb-1">
     
      <h2 className="text-3xl! font-bold! mb-5! text-amber-700!">Profile Settings</h2>
</div>
      <Card className="rounded-xl! shadow-sm! p-6! border! border-amber-200!">
        <div className="flex items-center mb-6">
          <Avatar size={64} icon={<UserOutlined />} className="bg-amber-500!" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-amber-900">{user.name}</h3>
            <p className="text-amber-700">{user.email}</p>
            <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">
              {user.role}
            </span>
          </div>
        </div>

        {/* Editable Form */}
        <Form form={form} layout="vertical" initialValues={user} onFinish={onFinish}>
          <Form.Item
            label={<span className="text-amber-800">Full Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined className="text-amber-500!" />} />
          </Form.Item>

          <Form.Item
            label={<span className="text-amber-800">Email</span>}
            name="email"
            rules={[{ required: true, type: "email", message: "Enter valid email" }]}
          >
            <Input prefix={<MailOutlined className="text-amber-500!" />} />
          </Form.Item>

          <Form.Item
            label={<span className="text-amber-800">Role</span>}
            name="role"
            rules={[{ required: true, message: "Please enter your role" }]}
          >
            <Input prefix={<TeamOutlined className="text-amber-500!" />} />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={() => form.resetFields()}
              className="text-amber-800! border! border-amber-400! hover:bg-amber-100!"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500! hover:bg-amber-600! text-white!"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
