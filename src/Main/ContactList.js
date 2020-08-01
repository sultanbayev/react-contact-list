import React from "react";
import { Table, Space, Button, Divider } from "antd";
import Context from "./Context";

function ContactList({ onAddNewClick, onEditClick }) {

  const { contacts, deleteContact } = React.useContext(Context);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Emergency Contact",
      dataIndex: "isEmergency",
      key: "isEmergency",

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => {onEditClick(record)}}>Edit</a>
          <a href="#" onClick={() => {deleteContact(record.key)}}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space>
        <Button type="primary" onClick={onAddNewClick}>
          Add new contact
        </Button>
      </Space>
      <Divider />
      <Table dataSource={contacts} columns={columns} />
    </>
  );
};

export default ContactList;
