import React from "react";
import { Link } from "react-router-dom";

import EarthImage from "../assets/earth.webp";
import MarsImage from "../assets/mars.webp";

interface Address {
  name: string;
  lote: string;
  phone: string;
  location: string;
}

interface AddressCardProps {
  address: Address;
  onDelete: () => void;
  onEdit: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onDelete,
  onEdit,
}) => {
  const getImage = (location: string) => {
    switch (location) {
      case "Earth":
        return EarthImage;
      case "Mars":
        return MarsImage;
      default:
        return null;
    }
  };

  const locationImage = getImage(address.location);
  return (
    <div className="border-2 hover:border-purple-600 md:min-w-96 max-w-96 p-4 mb-4 flex flex-row items-center justify-center gap-3 rounded-md shadow">
      {locationImage && (
        <img
          src={locationImage}
          alt={address.location}
          className="w-20 border-2 rounded-full h-20"
        />
      )}
      <div className="flex flex-col">
        <h3 className="md:text-lg text-sm font-bold">{address.name}</h3>
        <h4 className="font-semibold text-sm">{address.phone}</h4>
        <p className="text-sm ">{address.lote}</p>
        <p className="text-sm ">{address.location}</p>
        <div className="mt-4 justify-start font-semibold flex gap-2">
          <button
            className="border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 py-1 px-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
          <Link
            to="/address-edit"
            className="bg-purple-600 text-white hover:bg-purple-700 py-1 px-2 rounded"
            onClick={onEdit}
          >
            Edit address
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
