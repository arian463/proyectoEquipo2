import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/auth-options";

export const getSession = () => getServerSession(authOptions);