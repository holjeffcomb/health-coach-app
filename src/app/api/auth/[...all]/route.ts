// app/api/auth/[...all]/route.ts
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

const { POST, GET } = toNextJsHandler(auth);

export { POST, GET };
