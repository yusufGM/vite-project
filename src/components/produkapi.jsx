import { Button } from "./ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import useCartStore from "./store/useCartStore" // ✅ Tambahkan ini

const ProdukItem = ({ name, image, price }) => {
  const { addToCart, openDrawer } = useCartStore() // ✅ Panggil store-nya

  const handleAdd = () => {
    addToCart({ name, price, imgSrc: image })
    openDrawer()
  }

  return (
    <div className="m-0 pb-6">
      <Card className="h-128 pt-12">
        <CardAction className="self-center-safe">
          <img src={image} className="object-center h-64" />
        </CardAction>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <div className="py-4 text-red-600 font-bold">USD. {price}</div>
          <Button
            variant="secondary"
            className="bg-gray-900 text-white mt-2 w-40 py-2 rounded-xl cursor-pointer"
            onClick={handleAdd} 
          >
            Add To Cart
          </Button>
        </CardHeader>
      </Card>
    </div>
  )
}

export default ProdukItem
