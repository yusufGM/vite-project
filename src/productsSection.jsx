import './index.css'

const productsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
            <h2 className="text-3xl font-oswald font-bold uppercase mb-12 text-gray-900">Produk Unggulan</h2>
            <div className="listProduct grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="item group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center">
                <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9d0353b8-08f8-452d-bd50-3254400ddc4a/custom-nike-air-force-1-high.png" alt="" class="w-full h-64 object-cover transform group-hover:scale-105 transition"/>
                <h3 className="nameProduct text-gray-900 font-semibold text-lg uppercase mb-1">Air Force 1</h3>
                <div className="text-red-600 font-bold">Rp.<span className="price">2379000</span></div>
                <button className="addCart bg-gray-900 text-white mb-2 w-40 rounded-xl cursor-pointer">Add To Cart</button>
                </div>
                <div className="item group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center">
                <img src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/81b42444-2217-4cdc-9ee3-e6e74284f470/W+NIKE+V2K+RUN.png" alt="" class="w-full h-64 object-cover transform group-hover:scale-105 transition"/>
                <h3 className="nameProduct text-gray-900 font-semibold text-lg uppercase mb-1">Nike V2K Run</h3>
                <div className="text-red-600 font-bold">Rp.<span className="price">1909000</span></div>
                <button className="addCart bg-gray-900 text-white mb-2 w-40 rounded-xl cursor-pointer">Add To Cart</button>
                </div>
                <div className="item group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center">
                <img src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/fae7e36c-878a-4704-aa81-58a16e03e67f/W+NIKE+FREE+METCON+6.png" alt="" className="w-full h-64 object-cover transform group-hover:scale-105 transition"/>
                <h3 className="nameProduct text-gray-900 font-semibold text-lg uppercase mb-1">Nike Free Metcon 6</h3>
                <div className="text-red-600 font-bold">Rp.<span className="price">1909000</span></div>
                <button className="addCart bg-gray-900 text-white mb-2 w-40 rounded-xl cursor-pointer">Add To Cart</button>
                </div>
                <div className="item group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center">
                <img src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/82294235-c384-4e08-bb65-897aedd00890/AIR+ZOOM+PEGASUS+41JI.png" alt="" className="w-full h-64 object-cover transform group-hover:scale-105 transition"/>
                <h3 className="nameProduct text-gray-900 font-semibold text-lg uppercase mb-1">Nike Pegasus 41</h3>
                <div className="text-red-600 font-bold">Rp.<span className="price">2199000</span></div>
                <button className="addCart bg-gray-900 text-white mb-2 w-40 rounded-xl cursor-pointer">Add To Cart</button>
                </div>
            </div>
        </section>
    )
        
};

export default productsSection