import axios from 'axios'
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fristName: '',
    lastName: '',
    phone: '',
    address: ''
  })

  const [passwordError, setPasswordError] = useState(false);

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if (input.password !== input.confirmPassword) {
        setPasswordError(true);
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
      }
    } catch (err) {
      console.log(err.message)
    }

  }
  

  return (
    <div className="p-5 border w-3/6 min-w-[500px] mx-auto rounded mt-5 shadow-lg">
      <div className="text-3xl mb-5 ml-5">สมัคร</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <div className='  justify-start flex '>
          <label className="form-control w-full ml-5 max-w-xs">
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
          <label className="form-control w-full ml-5 max-w-xs">
            <div className="label">
              <span className="label-text">E-mail</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>
        </div>
        <div className='  justify-start flex '>
          <label className="form-control w-full ml-5 max-w-xs">
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full ml-5 max-w-xs">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              className={`input input-bordered w-full max-w-xs ${passwordError ? 'border-red-500' : ''}`}
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
            {passwordError && <p className="text-red-500">กรุณาตรวจสอบยืนยันรหัสผ่าน</p>}
          </label>
        </div>
        <div className='  justify-start flex '>
          <label className="form-control w-full ml-5 max-w-xs">
            <div className="label">
              <span className="label-text">FristName</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="fristName"
              value={input.fristName}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full ml-5 max-w-xs">
            <div className="label">
              <span className="label-text">LastName</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="lastName"
              value={input.lastName}
              onChange={hdlChange}
            />
          </label>
        </div>
        <label className="form-control w-full ml-5 ">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-screen-sm"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full ml-5 ">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-screen-sm"
            name="address"
            value={input.address}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-5 ml-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
        </div>
      </form>
    </div>
  );
}
