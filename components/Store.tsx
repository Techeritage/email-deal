import { Button } from "./ui/button";

const Store = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Store</h1>
        <Button className="bg-[#3371FF] w-fit px-5 h-[52px] rounded-[8px] hover:border-[#3371FF] hover:border">
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default Store;
