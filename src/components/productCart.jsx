import { useEffect, useState } from "react";
import useCartStore from "./store/useCartStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const ProductCart = ({ category, limit = 6 }) => {
  const { addToCart, openDrawer } = useCartStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;
        if (category) {
          filtered = filtered.filter(
            (item) => item.category?.toLowerCase() === category.toLowerCase()
          );
        }
        setItems(filtered.slice(0, limit));
      })
      .catch((err) => console.error(err));
  }, [category, limit]);

  const handleAddToCart = (item) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      imgSrc: item.imgSrc,
    });
    openDrawer();
  };

  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {category && (
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{category}</h2>
        )}

        {/* Barrier atas & bawah */}
        <div className="relative py-6 rounded-xl">
          <Carousel
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group relative rounded-2xl overflow-hidden hover:shadow-xl transition">
                    <Link to={`/product/${item._id}`}>
                      <div className="bg-gray-800">
                        <img
                          src={item.imgSrc}
                          alt={item.name}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = '/path/to/fallback-image.png'; 
                           }}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0  text-white py-3 text-center">
                        <h3 className="text-sm md:text-base font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-sm md:text-base font-medium">
                          Rp{item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="absolute top-3 right-3 inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300
                      "
                    >
                      + Cart
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 w-12 h-70 rounded-full bg-gray-200/90 text-black font-bold hover:bg-gray-300 transition flex items-center justify-center shadow-lg z-10">
              ‹
            </CarouselPrevious>
            <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-70 rounded-full bg-gray-200/90 text-black font-bold hover:bg-gray-300 transition flex items-center justify-center shadow-lg z-10">
              ›
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductCart;
