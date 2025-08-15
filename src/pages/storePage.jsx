import ProductList from "../components/productList"




 function StorePage () {
    return (
       <>
       <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition grid place-items-center p-4 pt-30">
        <ProductList/>
       </div>
      </>
    )
}

export default StorePage