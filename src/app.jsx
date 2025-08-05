import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import CartDrawer from './components/CartDrawer';
import useUserStore from './components/store/useUserStore';

// Halaman lazy-loaded
const Home = lazy(() => import('./Pages/home'));
const Login = lazy(() => import('./Pages/login'));
const Signup = lazy(() => import('./Pages/signup'));
const Checkout = lazy(() => import('./Pages/checkout'));
const Menpage = lazy(() => import('./Pages/men'));
const Womenpage = lazy(() => import('./Pages/women'));
const Kidspage = lazy(() => import('./Pages/kids'));
const Snkrspage = lazy(() => import('./Pages/snkrs'));
const Newfeatured = lazy(() => import('./Pages/new&featured'));
const Salepage = lazy(() => import('./Pages/sale'));
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));

function AdminRoute({ children }) {
  const { token, username } = useUserStore();
  const isAdmin = username === 'admin';

  return token && isAdmin ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <Header />
      <CartDrawer />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/menpage" element={<Menpage />} />
          <Route path="/womenpage" element={<Womenpage />} />
          <Route path="/kidspage" element={<Kidspage />} />
          <Route path="/snkrspage" element={<Snkrspage />} />
          <Route path="/newfeature" element={<Newfeatured />} />
          <Route path="/salepage" element={<Salepage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </Suspense>
  );
}

export default App;
