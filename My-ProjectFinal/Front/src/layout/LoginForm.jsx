import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState(false); 

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    setPasswordError(false);
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post("http://localhost:8889/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
      setPasswordError(true);
    }
  };  

  return (
    <div className="body flex justify-between mt-40">
      <div className="body_L w-1/2">
        <p className="house text-8xl mt-10 text-blue-700 text-center font-bold ">
          WareHouse
        </p>
        <p className="text text-4xl mt-6 text-center font-medium">
          มาสร้างคลังสินค้าของคุณกัน...
        </p>
      </div>
      <div className="p-5 border w-2/6 min-w-[400px] mx-auto rounded mt-5 shadow-lg">
        <form
          className="flex flex-col items-center gap-2 w-full"
          onSubmit={hdlSubmit}
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">username</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="password"
              className={`input input-bordered w-full max-w-xs ${passwordError ? 'border-red-500' : ''}`}
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
            {passwordError && <p className="text-red-500">รหัสผ่านไม่ถูกต้อง</p>}
          </label>
          <div className="flex gap-5 ">
            <button
              type="submit"
              className="btn bg-blue-700 text-white btn-info pl-32 pr-32 mt-5"
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <hr className="hr bg-blue-700 p-0.3 rounded-sm mt-2 w-full"></hr>
          <Link to="/register">
            <button className="btn bg-blue-700 text-white btn-info pl-16 pr-16 mt-2">สมัครสมาชิก</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
