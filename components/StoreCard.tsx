import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

const StoreCard = ({
  imageUrl,
  title,
  link,
  id,
}: {
  imageUrl: string;
  title: string;
  link: string;
  id: string;
}) => {
  return (
    <div className="border px-[3%] md:px-[5%] custom-shadows border-[#2B3B5A]/70 bg-[#151E2F]/95 mx-auto w-full md:max-w-[500px] rounded-[10px] shadow-md min-h-[150px]">
      <div className="flex py-5 gap-3 border-b border-[#2B3B5A]/70">
        <Image src={imageUrl} width={100} height={100} alt={title} />
        <div className="max-w-full overflow-hidden py-3">
          <p className="text-sm mb-2">{title}</p>
          <Link
            href={link}
            className="block text-xs opacity-90 truncate overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {link}
          </Link>
        </div>
      </div>
      <div className="py-5 flex gap-4">
        <Modal
          type="update"
          imageUrl={imageUrl}
          title={title}
          link={link}
          id={id}
        />
        <Modal type="delete" id={id} />
      </div>
    </div>
  );
};

export default StoreCard;
