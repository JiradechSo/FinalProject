import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ProductCard(props) {
  const { el, openModal, setTrigger } = props;
  const [serialNumbersCount, setSerialNumbersCount] = useState(0);

  useEffect(() => {
    const fetchSerialNumbersCount = async () => {
      try {
        console.log(el.id);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8889/serial/count?ProductId=${el.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSerialNumbersCount(response.data.serialCount);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching serial numbers count: ", error);
      }
    };

    fetchSerialNumbersCount();
  }, [el.id]);

  const hdlDelete = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8889/product/${el.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrigger((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    openModal(el.id);
  };

  const handleCardClick = () => {
    const el2 = { ...el };
    localStorage.setItem("el2", JSON.stringify(el2));
    window.location.href = "/serial";
  };

  return (
    <div
      className="bg-white shadow-2xl mx-auto ml-10 cursor-pointer rounded-lg p-3 hover:shadow-md transition duration-300"
      onClick={handleCardClick}
    >
      {el.imageUrl != null && (
        <img
          src={el.imageUrl}
          alt={el.name}
          className="w-full h-56 mb-4 rounded-lg"
        />
      )}
      <h2 className="bg-blue-600 pr-10 pl-10 rounded-xl text-white flex justify-center items-center text-3xl font-bold mb-4 h-12 overflow-hidden whitespace-nowrap">{el.name.length > 16 ? el.name.slice(0, 16) + '...' : el.name}</h2>
      <div className="flex justify-end">
        <div className=" bg-green-600 text-white w-full text-center font-bold px-4 py-2 rounded-lg mr-2">
          จำนวน {serialNumbersCount} ชิ้น
        </div>
        <button
          onClick={hdlDelete}
          className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg mr-2"
        >
          ลบ
        </button>
        <button
          onClick={(e) => handleEditClick(e)}
          className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-lg"
        >
          แก้ไข
        </button>
      </div>
    </div>
  );
}
