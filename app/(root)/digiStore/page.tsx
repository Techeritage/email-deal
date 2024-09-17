import ItemCard, { Item } from "@/components/ItemCard";
import { getItems } from "@/lib/powerhouse";

const DigiStore = async () => {
  const items = await getItems();
  return (
    <main className="min-h-screen h-full min-w-full bg-white">
      <nav className="py-3 bg-[#09111f] custom-shadows px-[3%] text-3xl font-semibold border-b">
        Tech WonderStore
      </nav>
      <section className="px-[3%] bg-white grid gap-10 pt-16 py-20">
        {(items?.data ?? []).reverse().map((item: Item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </section>
      <footer>
        <p className="py-5 text-center text-xs lg:text-sm">&copy; DigiStore</p>
      </footer>
    </main>
  );
};

export default DigiStore;
