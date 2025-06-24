import React from 'react';

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover transform group-hover:scale-105 transition"
      />
      <h3 className="text-gray-900 font-semibold text-lg uppercase mb-1">
        {name}
      </h3>
      <div className="text-red-600 font-bold">Rp. {price.toLocaleString()}</div>
      <button className="bg-gray-900 text-white mt-2 w-40 py-2 rounded-xl cursor-pointer">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
