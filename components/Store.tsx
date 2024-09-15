import Modal from "./Modal";
import StoreCard from "./StoreCard";

interface product {
  _id: string;
  title: string;
  link: string;
  imageUrl: string;
}
const Store = ({ products }: { products: product[] }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Store</h1>
        <Modal type="add" />
      </div>
      <div className="py-7 grid gap-7">
        {products?.length > 0 &&
          [...(products ?? [])].reverse().map((item) => {
            const { _id: id, title, link, imageUrl } = item;
            return (
              <StoreCard
                key={id}
                imageUrl={imageUrl}
                title={title}
                link={link}
                id={id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Store;
