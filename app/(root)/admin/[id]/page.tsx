import { getEmails } from "@/lib/powerhouse";

const AdminDashboardPage = async ({ params }: { params: { id: string } }) => {
  let data: any;
  data = await getEmails();

  let newData: any;
  newData = data?.data;

  if (!data || !data.success) {
    return <div>Failed to fetch emails.</div>;
  }

  return (
    <div>
      {params.id === process.env.NEXT_PUBLIC_ADMIN_KEY &&
        newData?.map((item: any) => <p>{item?.email}</p>)}
    </div>
  );
};

export default AdminDashboardPage;
