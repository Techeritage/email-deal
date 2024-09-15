import { Item } from "@/app/utils/models/Item";
import Image from "next/image";
import Link from "next/link";

interface Item {
  title: string;
  link: string;
  imageUrl: string;
}

const ItemCard = ({ item }: { item: Item }) => {
  const { imageUrl, title, link } = item;
  return (
    <Link href={link} className="text-black">
      <Image
        src={imageUrl}
        alt={title}
        width={360}
        height={250}
        className="rounded-2xl min-w-full h-[250px] object-cover"
      />
      <p className="text-xl font-medium mt-2 pl-2">{title}</p>
    </Link>
  );
};

export default ItemCard;
