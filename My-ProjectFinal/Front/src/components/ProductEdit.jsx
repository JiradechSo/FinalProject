import axios from "axios";
import { useState } from "react";

export default function ProductEdit(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    name: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const rs = await axios.put(`http://localhost:8889/product/${el.id}`, input,{
        headers : { Authorization : `Bearer ${token}`}
      })
       console.log(rs.data.products);
      setTrigger(prv => !prv)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-2xl font-bold mb-4">Product</span>
            </div>
            <input
              type="text"
              placeholder="New Name!!!"
              className="input input-bordered w-full "
              name="name"
              value={input.name}
              onChange={hdlChange}
            />
          </label>
          <button type='submit' className="btn btn-primary" onClick={closeModal}>Update</button>
          <button type='button' className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
