import Email from "@/components/Email";
import Header from "@/components/Header";
import Store from "@/components/Store";
//import { getEmails } from "@/lib/powerhouse";

const AdminDashboardPage = async () => {
  //{ params }: { params: { id: string } }
  //const data = await getEmails();

  //const newData = data?.data;

  //if (!data || !data.success) {
  //  return <div>Failed to fetch emails.</div>;
  //}

  return (
    <main className="min-h-screen min-w-full px-[3%]">
      <Header />
      <section>
        <Email />
        {/*params.id === process.env.NEXT_PUBLIC_ADMIN_KEY &&
        newData?.map((item: { _id: string; email: string }) => (
          <p key={item?._id}>{item?.email}</p>
        ))*/}
      </section>
      <section className="">
        <Store />
      </section>
    </main>
  );
};

export default AdminDashboardPage;
