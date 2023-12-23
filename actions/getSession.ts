import { getServerSession } from "next-auth";

import { authOptions } from "@/actions/auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}