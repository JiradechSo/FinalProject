import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductHouse(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    name: "",
  });
  const [status, setStatus] = useState([])
  
  useEffect( ()=>{
    if(status.length) { return }
    const run = async () => {
      const token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8889/product/all-status', {
        headers: {Authorization : `Bearer ${token}`}
      })
      setStatus(rs.data.status)
    }
      run()
  }, [])

  useEffect(() => {
    setInput({
      name: el?.name ?? "",
    });
  }, [el?.id]);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const rs = await axios.put(`http://localhost:8889/product/${el.id}`, output, {
        headers : { Authorization : `Bearer ${token}`}
      })
      console.log(rs)
      setTrigger(prv => !prv)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-4" onSubmit={hdlSubmit}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Product</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              name="name"
              value={input.name}
              onChange={hdlChange}
            />
          </label>
          <button type='submit' className="btn btn-info" onClick={closeModal}>
            Submit
          </button>
          <button type='button' className="btn btn-info" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
