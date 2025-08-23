
import { useState, useEffect } from "react";
import ProductList from "../components/productList";
import { useFilterStore } from "../components/store/filterStore"; // ✅ Zustand

function StorePage() {
  const { filters, setFilter, toggleFilter } = useFilterStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/items");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (filters.sale) {
    filteredProducts = filteredProducts.filter((p) => p.price < 3000000);
  }

  if (filters.gender !== "all") {
    filteredProducts = filteredProducts.filter((p) =>
      p.gender?.toLowerCase() === filters.gender
    );
  }

  if (filters.ageGroup !== "all") {
    filteredProducts = filteredProducts.filter((p) =>
      p.ageGroup?.toLowerCase() === filters.ageGroup
    );
  }
  if (filters.price === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (filters.price === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Store{" "}
            <span className="text-gray-500">({filteredProducts.length})</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
      
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="bg-white rounded-lg shadow p-4 max-h-[80vh] overflow-y-auto space-y-6">
        
              <div>
                <h2 className="font-semibold text-lg mb-3">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`text-left w-full px-2 py-1 rounded transition-colors ${
                          selectedCategory === category
                            ? "bg-black text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-3">Filters</h2>
                <div className="space-y-4">
           
                  <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilter("gender", e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Age Group</label>
                    <select
                      value={filters.ageGroup}
                      onChange={(e) => setFilter("ageGroup", e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="all">All</option>
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="block font-medium mb-1">Urutkan Harga</label>
                    <select
                      value={filters.price}
                      onChange={(e) => setFilter("price", e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="none">Default</option>
                      <option value="low-high">Rendah → Tinggi</option>
                      <option value="high-low">Tinggi → Rendah</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Sale & Offers</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={filters.sale}
                        onChange={() => toggleFilter("sale")}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black relative">
                        <div
                          className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white border border-gray-300 rounded-full transition-all ${
                            filters.sale ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

       
        <main className="flex-1">
          {loading ? (
            <p className="text-center py-10">Loading products...</p>
          ) : error ? (
            <p className="text-center py-10 text-red-500">{error}</p>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}

export default StorePage;
