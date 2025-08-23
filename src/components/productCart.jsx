import { useEffect, useState } from "react";
import useCartStore from "./store/useCartStore";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-16">
      {category && (
        <h2 className="text-6xl md:text-7xl font-extrabold drop-shadow-xl mb-6 px-6 md:px-12 lg:px-20">
          {category}
        </h2>
      )}

      <Carousel className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative">
        <CarouselContent className="-ml-2">
          {items.map((item) => (
            <CarouselItem
              key={item._id}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="flex flex-col shadow-md rounded-2xl overflow-hidden h-full">
                <CardContent className="flex flex-col p-4 h-full block border rounded-lg shadow hover:shadow-lg">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.imgSrc}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-4 text-center">
                      {item.name}
                    </h2>
                  </Link>
                  <div className="mt-auto flex justify-center">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="inline-block bg-black text-white rounded-3xl hover:bg-red-700 transition px-8 py-3 uppercase font-semibold tracking-widest cursor-pointer text-center"
                    >
                      Rp{item.price.toLocaleString("id-ID")}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 shadow-lg z-10">
          <span className="text-2xl">‹</span>
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 shadow-lg z-10">
          <span className="text-2xl">›</span>
        </CarouselNext>
      </Carousel>
    </section>
  );
};

export default ProductCart;
