import React from "react";

const AdminDashboardPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      {params.id === process.env.NEXT_PUBLIC_ADMIN_KEY && <div>dashboard</div>}
    </div>
  );
};

export default AdminDashboardPage;
