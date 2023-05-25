import {useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContex';

const ProtectRoutes = () => {
  const { isLoggedIn } = useContext(ProfileContext);
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectRoutes