import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ProdukItem = ({ name, description, image}) => {
    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction><img src={image} className="w-full h-64 object-cover transform group-hover:scale-105 transition"/></CardAction>
            </CardHeader>
        </Card>
        </>
    )
};

export default ProdukItem
