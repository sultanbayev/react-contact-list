import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import MainPage from "./Main/MainPage";
import { message } from "antd";
import Context from "./Main/Context";

function App() {
  const [contacts, setContacts] = React.useState([]);

  const addNewContact = (contact) => {
    setContacts(contacts.concat(contact));
  };

  const onSuccess = (successMessage) => {
    message.success(successMessage);
  };

  const onError = (errorMessage) => {
    message.error(errorMessage);
  }

  const contextValue = { contacts, addNewContact, onSuccess, onError };

  return (
    <Context.Provider value={contextValue}>
      <MainPage />
    </Context.Provider>
  );
}

export default App;
