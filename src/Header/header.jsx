import { useState } from 'react';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
 return (
     <>
     <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">
        <a href="#" aria-label="Nike Indonesia" className="flex items-center">
            <svg className="h-12 w-auto text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" fill="currentColor"/>
            </svg>
        </a>
        <nav className="hidden md:flex space-x-10 font-semibold text-sm text-gray-900 tracking-wide uppercase">
            <a href="#" className="hover:text-red-600 transition">New & Featured</a>
            <a href="#" className="hover:text-red-600 transition">Men</a>
            <a href="#" className="hover:text-red-600 transition">Women</a>
            <a href="#" className="hover:text-red-600 transition">Kids</a>
            <a href="#" className="hover:text-red-600 transition">Sale</a>
            <a href="#" className="hover:text-red-600 transition">SNKRS</a>
        </nav>
        <div className="flex space-x-6 items-center text-gray-700">
            <button aria-label="Search" className="hover:text-red-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            </button>
            <button onClick={() => setIsOpen(true)} aria-label="Cart" className="hover:text-red-600 transition relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="1" />
                <circle cx="17" cy="21" r="1" />
            </svg>
            <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </button>
        </div>
        </div>
    </nav>
    <aside id="drawer" className= {`fixed top-0 right-0 h-full w-96 bg-gray-900 shadow-lg flex flex-col z-50  border border-r-12 border-gray-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
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
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Checkout
        </button>
        <button type="button" onClick={() => setIsOpen(false)} className="bg-white px-4 py-2 rounded hover:bg-gray-400 transition">
          Close
        </button>
      </div>
    </form>
  </aside>
     </>

 );
};

export default Header