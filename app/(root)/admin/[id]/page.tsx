import Email from "@/components/Email";
import Header from "@/components/Header";
import Store from "@/components/Store";
import { getEmails, getItems } from "@/lib/powerhouse";

const AdminDashboardPage = async ({ params }: { params: { id: string } }) => {
  // Fetch both emails and products concurrently
  const [emailsResult, productsResult] = await Promise.allSettled([
    getEmails(),
    getItems(),
  ]);

  // Check if the promises resolved successfully or rejected
  const emailsData =
    emailsResult.status === "fulfilled" ? emailsResult.value : null;
  const productsData =
    productsResult.status === "fulfilled" ? productsResult.value : null;

  // Handle email fetching failure
  if (!emailsData || !emailsData.success) {
    return <div>Failed to fetch emails.</div>;
  }

  // Handle product fetching failure
  if (!productsData || !productsData.success) {
    return <div>Failed to fetch products.</div>;
  }

  // Extract the actual data
  const emails = emailsData?.data;
  const products = productsData?.data;

  return (
    <main className="min-h-screen h-full min-w-full px-[3%]">
      <Header />
      <section>
        <Email />
        {params.id === process.env.NEXT_PUBLIC_ADMIN_KEY &&
          emails?.map((item: { _id: string; email: string }) => (
            <p key={item?._id}>{item?.email}</p>
          ))}
      </section>
      <section>
        <Store products={products} />
      </section>
    </main>
  );
};

export default AdminDashboardPage;
