import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

const COOKIE_NAME = "admin_panel_access";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(COOKIE_NAME)?.value === "granted";

  if (!hasAccess) {
    redirect("/admin-unlock?next=/admin");
  }

  return <AdminClient />;
}
