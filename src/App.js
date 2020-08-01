import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import MainPage from "./Main/MainPage";
import { message } from "antd";
import Context from "./Main/Context";

function App() {

  const contacts = useContacts();

  const contextValue = {
    ...contacts,
    onSuccess: (successMessage) => message.success(successMessage),
    onError: (errorMessage) => message.error(errorMessage),
  };

  return (
    <Context.Provider value={contextValue}>
      <MainPage />
    </Context.Provider>
  );
}

export default App;

function useContacts() {

  const [contacts, setContacts] = useLocalStorage('contacts', [
    { 
      key: 0,
      birthday: "2020-07-14",
      gender: "Male",
      isEmergency: "Yes",
      name: "Ербол",
      phone: "+77774192728",
    },
    { 
      key: 1,
      birthday: "2020-04-14",
      gender: "Male",
      isEmergency: "No",
      name: "Васёк",
      phone: "+77774192829",
    },
  ]);

  const addContact = (values) => {
    setContacts(contacts.concat(values));
  };

  const deleteContact = (key) => {
    setContacts(contacts.filter(contact => contact.key !== key));
  }

  const updateContact = (key, values) => {
    setContacts(contacts.map((contact) => {
      if (contact.key === key) {
        contact = {...values};
        return contact;
      } else {
        return contact;
      }
    }));
  }

  return {
    contacts,
    addContact,
    deleteContact,
    updateContact
  }
}

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}