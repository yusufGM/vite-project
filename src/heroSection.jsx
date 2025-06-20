import './index.css'

const HeroSection = () => {
    return (
        <section className="relative pt-28">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="relative rounded-xl overflow-hidden shadow-2xl ">
                <img alt="Nike. Just Do It" className="_32IPZERI _3jm9Bm_E guL_1FMX" src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1268,c_limit/f5654862-ef4d-4f10-85f7-7c11f1fe1f8f/nike-just-do-it.png" data-landscape-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/f5654862-ef4d-4f10-85f7-7c11f1fe1f8f/nike-just-do-it.png" data-portrait-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/4129e466-9f79-42d4-8660-1d836cac4c7b/nike-just-do-it.png" data-image-loaded-class="guL_1FMX"/>
                <div className=" flex items-center px-8 md:px-16 py-6">
                <div className="max-w-lg text-black">
                    <h1 className="text-5xl md:text-6xl font-oswald font-bold tracking-wide leading-tight mb-4">
                    JUST DO IT.
                    </h1>
                    <a href="#products" className="inline-block bg-black text-white rounded-3xl hover:bg-red-700 transition px-8 py-3 uppercase font-semibold tracking-widest">
                    SHOP
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default HeroSection