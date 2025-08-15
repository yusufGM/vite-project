import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import CartDrawer from './components/CartDrawer';
import useUserStore from './components/store/useUserStore';
import useCartStore from './components/store/useCartStore';
import ScrollToTop from './components/ui/ScrollToTop';
import { usePathListener } from './components/store/useCartStore';
import { Toaster } from 'sonner';
import ProductDetail from "./pages/ProductDetail";
const HomePage = lazy(() => import('./pages/homePage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const SignUp = lazy(() => import('./pages/signUp'));
const CheckoutPage = lazy(() => import('./pages/checkoutPage'));
const StorePage = lazy(() => import('./pages/storePage'));
const SalePage = lazy(() => import('./pages/salePage'));
const AdminDashboard = lazy(() => import('./pages/adminDashboard'));

function PrivateRoute({ children }) {
  const { token } = useUserStore();
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { token, username } = useUserStore();
  const isAdmin = username === 'admin';
  return token && isAdmin ? children : <Navigate to="/login" />;
}

function App() {
  usePathListener();

  const location = useLocation();
  const closeDrawer = useCartStore(state => state.closeDrawer);

  useEffect(() => {
    closeDrawer(); 
  }, [location.pathname, closeDrawer]);


  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <ScrollToTop />
      <Header />
      <CartDrawer />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="/StorePage" element={<StorePage />} />
          <Route path="/salepage" element={<SalePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
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
      <Toaster position="top-center" richColors closeButton />
    </Suspense>
  );
}

export default App;
