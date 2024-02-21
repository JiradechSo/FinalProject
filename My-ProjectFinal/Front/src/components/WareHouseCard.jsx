import axios from "axios";
import React from "react";

export default function WareHouseCard(props) {
  const { el, openModal, setTrigger } = props;
  
  const hdlDelete = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/ware/${el.id}`, {
        headers : { Authorization : `Bearer ${token}`}
      });
      setTrigger(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    openModal(el.id);
  };

  const handleCardClick = () => {
    localStorage.setItem('el', JSON.stringify(el));
    window.location.href = '/product';
  };
  


  return (
    <div
      className={`card bg-white shadow-2xl mx-auto cursor-pointer hover:shadow-md
      active:shadow-none active:translate-x-2 active:translate-y-1`}
    >
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-name bg-blue-600 pr-10 pl-10 rounded-xl text-white items-center flex text-3xl font-bold" onClick={handleCardClick}>{el.name}</h2>
          <div className=" flex flex-col">
            <div className="badge bg-red-600 hover:bg-red-700 border-none text-base text-white font-bold ml-3 w-16 p-4  " onClick={hdlDelete}>ลบ</div>
            <div className="badge bg-yellow-400 hover:bg-yellow-500 border-none text-base font-bold text-white w-16 ml-3 mt-4 p-4" onClick={handleEditClick}>แก้ไข</div>
          </div>
        </div>
      </div>
    </div>
  );
}
