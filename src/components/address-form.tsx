import { ArrowRightIcon } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export interface Address {
  name: string;
  lote: string;
  phone: string;
  location: string;
}

interface AddressFormProps {
  onAddAddress: (newAddress: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddAddress }) => {
  const [formData, setFormData] = useState<Address>({
    name: "",
    lote: "",
    phone: "",
    location: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.lote.length !== 4) {
      toast.error("Batch number must be 4 digits.");
      return;
    }

    onAddAddress(formData);
    setFormData({
      name: "",
      lote: "",
      phone: "",
      location: "",
    });
    toast.success("Address registered successfully!");
  };

  return (
    <div className="w-full flex gap-10 flex-col min-h-[100vh] px-5 justify-center items-center">
      <h1 className="font-bold md:max-w-[40vw] w-full md:text-3xl text-2xl mt-5">
        New shipping address
      </h1>

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
              className="border-2 text-sm rounded-md p-1  "
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
              className="border-2 text-sm rounded-md p-1"
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
            minLength={4}
            maxLength={4}
            id="lote"
            name="lote"
            className="border-2 text-sm w-2/3 rounded-md p-1 "
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
            className="border-2 text-sm rounded-md w-20 p-1 "
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value=""></option>
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
      <div className="flex max-w-[70vw] justify-end">
        <Link
          to="/address-list"
          className="text-purple-600 hover:text-white hover:bg-purple-600 flex justify-center py-1 gap-2 items-center w-60 rounded-md border-2 border-purple-600   font-semibold"
          type="submit"
        >
          See my addresses
          <ArrowRightIcon size={20} />
        </Link>
      </div>
    </div>
  );
};

export default AddressForm;
