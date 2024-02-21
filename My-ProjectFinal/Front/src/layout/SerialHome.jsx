import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function SerialHome(props) {
  const [el, setEl] = useState(null);
  const [serialNumbers, setSerialNumbers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const elString = localStorage.getItem("el2"); 
    if (elString) {
      const el2 = JSON.parse(elString);
      setEl(el2);
      fetchSerialNumbers(el2.id);
    }
  }, [location]);
  

  console.log(el)
  const fetchSerialNumbers = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8889/serial/?ProductId=${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSerialNumbers(response.data.SerialNumber);
    } catch (error) {
      console.error("Error fetching serial numbers: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8889/serial/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSerialNumbers((prevNumbers) =>
        prevNumbers.filter((serial) => serial.id !== id)
      );
      alert("นำสินค้าออกไปเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error deleting serial number: ", error);
      alert("Failed to delete serial number");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
      <Link to="/product" className="ml-2">
    <button className="btn bg-yellow-400 hover:bg-yellow-600 text-white border-none btn-info pl-4 pr-4 mt-2">
      Back
    </button>
  </Link>
    <div className="text-center text-3xl mt-4 text-blue-700 font-bold flex-grow">
      Serial Numbers
    </div>
    <div className="mr-5">
      <Link
        to={{
          pathname: "/addserial",
          search: `?productId=${el ? el.id : ""}`,
        }}
        className="text-blue-500 hover:underline"
      >
        <button className="btn bg-green-500 hover:bg-green-600 border-none text-white btn-info pl-16 pr-16 mt-2">
          Add
        </button>
      </Link>
    </div>
  </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Serial Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Note
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ImportDate
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {serialNumbers.map((serial) => (
            <tr key={serial.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{serial.sn}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{serial.note}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(serial.dueDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(serial.id)}
                  className="text-red-500 hover:underline"
                  type="button"
                >
                  Import
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
