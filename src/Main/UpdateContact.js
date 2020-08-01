import React from "react";
import { Form, Input, Button, Space, DatePicker, Select, Switch } from "antd";
import moment from 'moment';
import Context from "./Context";

function UpdateContact({ onCancelClick, contactToEdit }) {

  const [form] = Form.useForm();
  const {
    updateContact,
    onSuccess,
    // onError,
  } = React.useContext(Context);

  const onFormFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      key: new Date().getTime(),
      birthday: fieldsValue.birthday.format('YYYY-MM-DD'),
      gender: fieldsValue.gender === 'male' ? 'Male' : 'Female',
      isEmergency: fieldsValue.isEmergency === true ? 'Yes' : 'No',
    }
    updateContact(contactToEdit.key, values);
    onSuccess('Contact has been updated');
    onCancelClick();
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label="Name"
        initialValue={ contactToEdit && contactToEdit.name}
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
        initialValue={ contactToEdit && contactToEdit.phone}
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
        name="gender"
        label="Gender"
        initialValue={ contactToEdit && contactToEdit.gender}
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
        name="birthday"
        label="Birthday"
        initialValue={moment(contactToEdit.birthday, 'YYYY-MM-DD')}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="isEmergency"
        label="Emergency Contact"
        valuePropName="checked"
      >
        <Switch defaultChecked={contactToEdit.isEmergency === 'Yes' ? true : false}/>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Update Contact
          </Button>
          <Button type="primary" danger onClick={onCancelClick}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateContact;
