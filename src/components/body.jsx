import ProductCart from './productCart';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <>
      <section className="relative pt-24">
        <div className="w-full h-screen relative overflow-hidden">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1268,c_limit/f5654862-ef4d-4f10-85f7-7c11f1fe1f8f/nike-just-do-it.png"
            alt="TAPAK-O! – Menapak Bersama"
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex items-center px-6 md:px-16">
            <div className="max-w-xl text-white space-y-6 animate-fadeUp">
              <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-xl">
                TAPAK-O!
              </h1>
              <p className="text-xl md:text-2xl font-light drop-shadow-lg">
                Menapak Bersama. Gaya untuk setiap langkah, dari kasual hingga olahraga.
              </p>
              <Link to="/storepage" className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full px-8 py-3 uppercase font-semibold tracking-widest shadow-2xl hover:scale-105 transition-transform">
                Mulai Menapak
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductCart category="Casual Shoes" limit={6} />
      <ProductCart category="Boots" limit={6} />
      <ProductCart category="Minimalist Shoes" limit={6} />
      <ProductCart category="High Heels" limit={6} />
    </>
  );
};

export default Body;
