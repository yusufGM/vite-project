
import ProductCard from './ProductCard';
const products = [
  {
    name: "Air Force 1",
    price: 2379000,
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9d0353b8-08f8-452d-bd50-3254400ddc4a/custom-nike-air-force-1-high.png",
  },
  {
    name: "Nike V2K Run",
    price: 1909000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/81b42444-2217-4cdc-9ee3-e6e74284f470/W+NIKE+V2K+RUN.png",
  },
  {
    name: "Nike Free Metcon 6",
    price: 1909000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/fae7e36c-878a-4704-aa81-58a16e03e67f/W+NIKE+FREE+METCON+6.png",
  },
  {
    name: "Nike Pegasus 41",
    price: 2199000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/82294235-c384-4e08-bb65-897aedd00890/AIR+ZOOM+PEGASUS+41JI.png",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
      <h2 className="text-3xl font-oswald font-bold uppercase mb-12 text-gray-900">
        Produk Unggulan
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts