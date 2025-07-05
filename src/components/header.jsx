import { Link } from 'react-router-dom';
import useCartStore from './store/useCartStore';

const Header = () => {
    const { openDrawer, cart } = useCartStore();

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">
                <Link to="/" aria-label="Nike Indonesia" className="flex items-center">
                    <svg className="h-12 w-auto text-black" viewBox="0 0 24 24" fill="none">
                        <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" fill="currentColor"/>
                    </svg>
                </Link>

                <nav className="hidden md:flex space-x-10 font-semibold text-sm text-gray-900 tracking-wide uppercase">
                    <Link to="/newFeatured" className="hover:text-red-600">New & Featured</Link>
                    <Link to="/menPage" className="hover:text-red-600">Men</Link>
                    <Link to="/womenPage" className="hover:text-red-600">Women</Link>
                    <Link to="/kidsPage" className="hover:text-red-600">Kids</Link>
                    <Link to="/salePage" className="hover:text-red-600">Sale</Link>
                    <Link to="/snkrsPage" className="hover:text-red-600">SNKRS</Link>
                </nav>

                <div className="flex space-x-6 items-center text-gray-700">
                    <button onClick={openDrawer} aria-label="Cart" className="hover:text-red-600 relative">
                        <svg className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                            <circle cx="7" cy="21" r="1" />
                            <circle cx="17" cy="21" r="1" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <Link to="/login" className='text-2xl hover:text-red-600 transition'>Login</Link>
                </div>
            </div>
        </nav>
        
    );
};

export default Header;
