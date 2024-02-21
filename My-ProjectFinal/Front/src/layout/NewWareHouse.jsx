import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function WareHouseForm() {
  const [input, setInput] = useState({
    name: '',
  });
  const [error, setError] = useState('');

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(''); 
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      if (!input.name.trim()) {
        setError('กรุณากรอกข้อมูล');
        return;
      }
      const token = localStorage.getItem('token');
      const rs = await axios.post('http://localhost:8889/ware', input, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('สร้างห้องเก็บข้อมูลสำเร็จ');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className="flex flex-col min-w-[600px] border rounded shadow-2xl w-1/2 mx-auto p-4 gap-6"
      onSubmit={hdlSubmit}
    >
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">WareHouse</span>
        </div>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button className="btn btn-primary">Add new</button>
      <Link to="/" className="btn btn-secondary">
        <button>Back to Home</button>
      </Link>
    </form>
  );
}
