import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressForm, { Address } from "./components/address-form";
import AddressList from "./components/address-list";
import AddressEdit from "./components/address-edit";

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = (newAddress: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  const handleDeleteAddress = (index: number) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((_, i) => i !== index)
    );
  };

  const handleEditAddress = (index: number) => {
    setEditingAddress(addresses[index]);
  };

  const handleSaveEditedAddress = (updatedAddress: Address) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((addr) =>
        addr.lote === updatedAddress.lote ? updatedAddress : addr
      )
    );
    setEditingAddress(null);
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AddressForm onAddAddress={handleAddAddress} />}
        />
        <Route
          path="/address-list"
          element={
            <AddressList
              addresses={addresses}
              onDeleteAddress={handleDeleteAddress}
              onEditAddress={handleEditAddress}
            />
          }
        />
        <Route
          path="/address-edit"
          element={
            editingAddress !== null && (
              <AddressEdit
                address={editingAddress}
                onSave={handleSaveEditedAddress}
                onCancel={handleCancelEdit}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
