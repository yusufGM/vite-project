import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/header';
import Footer from './components/footer';


const Home = lazy(() => import('./Pages/home'));
const Login = lazy(() => import('./Pages/login'));
const Menpage = lazy(() => import('./Pages/men'));
const Kidspage = lazy(() => import('./Pages/kids'));
const Newfeatured = lazy(() => import('./Pages/new&featured'));
const Salepage = lazy(() => import('./Pages/sale'));
const Womenpage = lazy(() => import('./Pages/women'));
const Snkrspage = lazy(() => import('./Pages/snkrs'));
import { Outlet } from 'react-router-dom';
import CartDrawer from './components/components/CartDrawer';
function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center ">Loading...</div>}>
      <Header />
      <CartDrawer />
     
      <Routes  className="min-h-screen flex flex-col">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menpage" element={<Menpage />} />
        <Route path="/kidspage" element={<Kidspage />} />
        <Route path="/newfeature" element={<Newfeatured />} />
        <Route path="/salepage" element={<Salepage />} />
        <Route path="/womenpage" element={<Womenpage />} />
        <Route path="/snkrspage" element={<Snkrspage />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
