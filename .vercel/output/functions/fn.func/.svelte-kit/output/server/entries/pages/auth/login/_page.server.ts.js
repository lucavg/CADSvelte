import { r as redirect, f as fail } from "../../../../chunks/index.js";
import bcrypt from "bcrypt";
import { d as db } from "../../../../chunks/database.js";
const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};
const login = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { invalid: true });
  }
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return fail(400, { credentials: true });
  }
  const userPassword = await bcrypt.compare(password, user.passwordHash);
  if (!userPassword) {
    return fail(400, { credentials: true });
  }
  const authenticatedUser = await db.user.update({
    where: { email: user.email },
    data: { userAuthToken: crypto.randomUUID() }
  });
  cookies.set("session", authenticatedUser.userAuthToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  });
  throw redirect(302, "/");
};
const actions = { login };
export {
  actions,
  load
};