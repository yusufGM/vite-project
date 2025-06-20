import './index.css'

const Aside = () => {
    return (
        <aside id="drawer" className="transition-transform duration-300 ease-in-out translate-x-full fixed top-0 right-0 h-full w-96 bg-gray-900 shadow-lg flex flex-col z-50  border border-r-12 border-gray-900">
            <div className="p-6 border-b">
            <h2 className="text-xl text-white mb-1">Shopping Cart</h2>
            </div>
            <div className="listCart">
            <div className="item grid grid-cols-[50px_130px_100px_1fr] gap-1 text-center items-center ">
            </div>
            
            </div>
            <div className="total border-t border-gray-200 p-3 text-white text-center items-center">
                Total: Rp.<span id="totalPrice"></span>
            </div>
            <form className="" onsubmit="event.preventDefault(); alert('Yey Happy Shopping!')">
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Checkout
                </button>
                <button type="button" id="closeDrawerBtn" className="bg-white px-4 py-2 rounded hover:bg-gray-400 transition">
                Close
                </button>
            </div>
            </form>
        </aside>
    );
};

export default Aside