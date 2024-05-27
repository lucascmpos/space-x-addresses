import React from "react";
import AddressCard from "./address-card";
import { Link } from "react-router-dom";

interface Address {
  name: string;
  lote: string;
  phone: string;
  location: string;
}

interface AddressListProps {
  addresses: Address[];
  onDeleteAddress: (index: number) => void;
  onEditAddress: (index: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onDeleteAddress,
  onEditAddress,
}) => {
  return (
    <div className="w-full py-4 min-h-[100vh] px-5 flex gap-5 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">My address list</h1>
      {addresses.length === 0 ? (
        <div className="flex flex-col gap-3 justify-center items-center w-1/2">
          <p className="font-semibold text-xl">No addresses here</p>
        </div>
      ) : (
        <ul>
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              address={address}
              onDelete={() => onDeleteAddress(index)}
              onEdit={() => onEditAddress(index)}
            />
          ))}
        </ul>
      )}
      <Link
        className="text-purple-600  flex justify-center rounded-md border-purple-600 border-2 hover:bg-purple-600 hover:text-white p-2 font-semibold"
        to="/"
      >
        Register new address
      </Link>
    </div>
  );
};

export default AddressList;
