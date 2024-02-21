import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'หน้าหลัก' },
]

const userNav = [
  { to : '/', text: 'หน้าหลัก' },
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-blue-700">
      <div className="flex-1">
       <a className="btn  ml-4 p-2 text-2xl bg-white text-blue-700 rounded-2xl">{user?.id ? user.username : 'WareHouse'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} className='sw  bg-white rounded-3xl m-1 text-sm text-blue-700 font-bold'>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li  className='sw  bg-white rounded-3xl m-1 text-sm text-blue-700 font-bold'>
              <Link to='#' onClick={hdlLogout}>ล็อกเอาท์</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
