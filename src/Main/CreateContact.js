import React from "react";
import { Form, Input, Button, Space, DatePicker, Select, Switch } from "antd";
import Context from "./Context";

function CreateContact({ onCancelClick, onSuccessCreate }) {

  const [form] = Form.useForm();
  const { addNewContact } = React.useContext(Context);
  const { onSuccess } = React.useContext(Context);
  const { onError } = React.useContext(Context);
  const { contacts } = React.useContext(Context);

  const onFormFinish = (fieldsValue) => {

    const phoneExists = contacts.filter(contact => contact.phone === fieldsValue.phone).length;

    if (!phoneExists) {
      const values = {
        ...fieldsValue,
        'birthday': fieldsValue['birthday'].format('YYYY-MM-DD'),
        'gender': fieldsValue['gender'] === 'male' ? 'Male' : 'Female',
        'isEmergency': fieldsValue['isEmergency'] === true ? 'Yes' : 'No',
      }
      addNewContact(values);
      onSuccess('Contact was created');
      onCancelClick();
    } else {
      onError('Contact with the same phone number already exists');
    }
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input contact name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input phone number",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: "Please select the day of your birthday",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select your gender",
          },
        ]}
      >
        <Select>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="male">Male</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="isEmergency"
        label="Emergency Contact"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Add Contact
          </Button>
          <Button type="primary" danger onClick={onCancelClick}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateContact;
