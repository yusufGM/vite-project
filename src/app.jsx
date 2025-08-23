import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import useUserStore from "./components/store/useUserStore.js";
import useCartStore, { usePathListener } from "./components/store/useCartStore.js";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";
import { Toaster } from "sonner";
import ProductDetail from "./pages/productDetail.jsx";

const HomePage = lazy(() => import("./pages/homePage.jsx"));
const LoginPage = lazy(() => import("./pages/loginPage.jsx"));
const SignUp = lazy(() => import("./pages/signUp.jsx"));
const CheckoutPage = lazy(() => import("./pages/checkoutPage.jsx"));
const StorePage = lazy(() => import("./pages/storePage.jsx"));
const SalePage = lazy(() => import("./pages/salePage.jsx"));
const AdminDashboard = lazy(() => import("./pages/adminDashboard.jsx"));

function PrivateRoute({ children }) {
  const { token } = useUserStore();
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { token, username } = useUserStore();
  const isAdmin = username === "admin";
  return token && isAdmin ? children : <Navigate to="/login" />;
}

function App() {
  usePathListener();

  const location = useLocation();
  const closeDrawer = useCartStore((state) => state.closeDrawer);

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
          <Route path="/storepage" element={<StorePage />} />  
          <Route path="/sale" element={<SalePage />} />
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
