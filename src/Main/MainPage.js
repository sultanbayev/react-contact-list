import React from "react";
import { Layout, PageHeader } from "antd";
import styled from "styled-components";
import ContactList from "./ContactList";
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContact"

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const InsideLayout = styled(Layout)`
  width: 800px;
`;

function MainPage() {
  const [display, setDisplay] = React.useState("default");
  const [contactToEdit, setContactToEdit] = React.useState(null);

  const onAddNewClick = () => {
    setDisplay("create");
  };

  const onCancelClick = () => {
    setDisplay("default");
  };

  const onEditClick = (record) => {
    setDisplay("update");
    setContactToEdit(record);
  };

  return (
    <MainLayout>
      <InsideLayout>
        <PageHeader title="My Contacts" subTitle="React application" />
        {display === "default" && <ContactList onAddNewClick={onAddNewClick} onEditClick={onEditClick} />}
        {display === "create" && (
          <CreateContact onCancelClick={onCancelClick} />
        )}
        {display === "update" && (
          <UpdateContact onCancelClick={onCancelClick} contactToEdit={contactToEdit} />
        )}
      </InsideLayout>
    </MainLayout>
  );
}

export default MainPage;
