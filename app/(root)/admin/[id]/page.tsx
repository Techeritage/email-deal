import { getEmails } from "@/lib/powerhouse";

const AdminDashboardPage = async ({ params }: { params: { id: string } }) => {
  const data = await getEmails();

  const newData = data?.data;

  if (!data || !data.success) {
    return <div>Failed to fetch emails.</div>;
  }

  return (
    <div>
      {params.id === process.env.NEXT_PUBLIC_ADMIN_KEY &&
        newData?.map((item: { _id: string; email: string }) => (
          <p key={item?._id}>{item?.email}</p>
        ))}
    </div>
  );
};

export default AdminDashboardPage;
