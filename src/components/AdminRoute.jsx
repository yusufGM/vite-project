import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const AdminRoute = ({ children }) => {
  const { token, role } = useUserStore();

  if (!token || role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
