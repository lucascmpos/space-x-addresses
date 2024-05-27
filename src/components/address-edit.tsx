import React, { useState } from "react";
import { Address } from "./address-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeftIcon } from "lucide-react";

interface AddressEditProps {
  address: Address;
  onSave: (updatedAddress: Address) => void;
  onCancel: () => void;
}

const AddressEdit: React.FC<AddressEditProps> = ({ address, onSave }) => {
  const [formData, setFormData] = useState<Address>(address);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.lote.length !== 4) {
      toast.error("Batch number must be 4 digits.");
      return;
    }
    if (formData.phone && !/^\d+$/) {
      toast.error("Phone number must contain only digits.");
      return;
    }
    onSave(formData);
    navigate("/address-list");
  };

  return (
    <div className="w-full flex gap-10 flex-col px-10  min-h-[100vh] justify-center items-center">
      <div className="flex md:max-w-[40vw] w-full  flex-row items-center  gap-2">
        <Link to="/">
          <ArrowLeftIcon className="border-2 rounded-full hover:border-purple-600" />
        </Link>
        <h1 className="text-3xl font-bold">Edit address</h1>
      </div>
      <form
        className="flex flex-col md:max-w-[40vw] w-full justify-around p-5 gap-5 border-2 rounded-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between gap-2 flex-col lg:flex-row">
          <div className="flex flex-col w-auto lg:w-2/3 gap-2">
            <label className="font-bold text-sm" htmlFor="name">
              Full name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border-2 text-sm rounded-md p-1   "
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm" htmlFor="phone">
              Mobile phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border-2 text-sm rounded-md p-1  "
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm" htmlFor="lote">
            Batch *
          </label>
          <input
            type="number"
            id="lote"
            name="lote"
            className="border-2 text-sm w-2/3 p-1  rounded-md"
            value={formData.lote}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex  flex-col  gap-2">
          <label className="font-bold text-sm" htmlFor="location">
            Choose your planet *
          </label>
          <select
            id="location"
            className="border-2 text-sm rounded-md p-1  w-20"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="Mars">Mars</option>
            <option value="Earth">Earth</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="text-white w-fit md:w-1/2 text-nowrap rounded-md bg-purple-600 hover:bg-purple-700 p-2 font-semibold"
            type="submit"
          >
            Submit address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressEdit;
