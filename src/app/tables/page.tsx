import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Users } from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import Products from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFour from "@/components/Tables/TableFour";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <Users />
        <Products />
        <TableFour />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
