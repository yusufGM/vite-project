import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./backend/models/Item.js";

dotenv.config();

const items = [
  { title: 'Nike Air Zoom Pegasus 38', description: 'Sepatu lari yang nyaman dengan respon cepat.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/406ce261-d7c8-4066-812b-b418e3dd84b0/air-zoom-pegasus-38-mens-running-shoes-KLvDcj.png', price: 1200000 }, { _id: ObjectId('68888461323b05ec2689b03e'), title: 'Nike Air Max 270', description: 'Desain stylish dengan bantalan udara yang empuk.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/e6ddf51e-057c-4c6e-9a0b-67f81dcfcefe/air-max-270-mens-shoes-KkLcGR.png', price: 1450000 }, { _id: ObjectId('68888461323b05ec2689b03f'), title: "Nike Air Force 1 '07", description: 'Gaya klasik dengan siluet ikonik.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/50665bce-98d7-44f5-8888-8a67ff3a7b81/air-force-1-07-mens-shoes-b1x5hD.png', price: 1300000 }, { _id: ObjectId('68888461323b05ec2689b040'), title: "Nike Blazer Mid '77 Vintage", description: 'Tampilan retro dengan sentuhan modern.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/730c5be1-51ea-45dc-bba2-4c5f5385e3a0/blazer-mid-77-vintage-mens-shoes-7tQ4wN.png', price: 1250000 }, { _id: ObjectId('68888461323b05ec2689b041'), title: 'Nike React Infinity Run Flyknit', description: 'Didesain untuk mengurangi cedera dan memberikan kenyamanan ekstra.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/64f2290f-91d7-42b6-9b5f-5892e31f3960/react-infinity-run-flyknit-3-mens-road-running-shoes-KXbDHR.png', price: 1600000 }, { _id: ObjectId('68888461323b05ec2689b042'), title: 'Nike Air VaporMax Flyknit 3', description: 'Ringan dan fleksibel dengan tampilan futuristik.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/bb1964be-6c5d-4f52-94b8-b1c9287e7236/air-vapormax-flyknit-3-mens-shoes-wfCqj7.png', price: 2200000 }, { _id: ObjectId('68888461323b05ec2689b043'), title: 'Nike ZoomX Vaporfly NEXT%', description: 'Performa maksimal untuk pelari kompetitif.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/bba47b30-4b20-4f15-8e90-3770e6f997fa/zoomx-vaporfly-next-2-mens-road-racing-shoes-HW8LDd.png', price: 3500000 }, { _id: ObjectId('68888461323b05ec2689b044'), title: 'Nike Air Zoom Alphafly NEXT%', description: 'Sepatu lari tercepat Nike dengan teknologi canggih.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/7b3e015e-bdcb-4874-a96c-bc55a5029a63/air-zoom-alphafly-next-mens-road-racing-shoes-JhGHmR.png', price: 4200000 }, { _id: ObjectId('68888461323b05ec2689b045'), title: 'Nike Air Max 90', description: 'Model klasik dengan warna modern.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/53296188-3d4d-4d55-96c6-7c12bd76c57e/air-max-90-mens-shoes-W999hf.png', price: 1500000 }, { _id: ObjectId('68888461323b05ec2689b046'), title: 'Nike Free RN 5.0', description: 'Cocok untuk latihan harian dengan fleksibilitas tinggi.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/8b20423a-e435-41b1-8734-4cc8f5eecbba/free-rn-5-0-mens-running-shoe-X3wrq2.png', price: 1100000 }, { _id: ObjectId('68888461323b05ec2689b047'), title: 'Nike Air Jordan 1 Mid', description: 'Gaya ikonik dari lini Jordan Brand.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/ae063a4e-c4b1-4462-b989-b764fa9b287a/air-jordan-1-mid-shoes-1Zm6FM.png', price: 1900000 }, { _id: ObjectId('68888461323b05ec2689b048'), title: 'Nike Air Huarache', description: 'Sepatu kasual dengan kenyamanan luar biasa.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/07c11e4c-6e44-4f3b-a877-cff719fae254/air-huarache-mens-shoes-9vK2fV.png', price: 1350000 }, { _id: ObjectId('68888461323b05ec2689b049'), title: 'Nike SB Dunk Low', description: 'Pilihan populer untuk skateboarding.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/b0bc3e42-62d6-45c6-8cb8-6379be105d2b/sb-dunk-low-pro-skate-shoes-jb8Vjz.png', price: 1600000 }, { _id: ObjectId('68888461323b05ec2689b04a'), title: 'Nike LeBron 20', description: 'Sepatu basket dengan teknologi mutakhir.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/7f53170f-1104-4a0b-a63e-0e5985eb48aa/lebron-xx-ep-basketball-shoes-rbQ9vh.png', price: 2900000 }, { _id: ObjectId('68888461323b05ec2689b04b'), title: 'Nike Metcon 8', description: 'Dirancang untuk latihan kekuatan dan HIIT.', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/cd6c22f7-3e56-4f7e-92c7-06deee9a0d71/metcon-8-mens-workout-shoes-WnXkQh.png', price: 1700000 }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected...");

    await Item.deleteMany(); // hapus data lama biar fresh
    await Item.insertMany(items);

    console.log("✅ Data berhasil dimasukkan!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
