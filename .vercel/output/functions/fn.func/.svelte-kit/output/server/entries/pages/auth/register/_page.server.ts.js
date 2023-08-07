import { r as redirect, f as fail } from "../../../../chunks/index.js";
import bcrypt from "bcrypt";
import { d as db } from "../../../../chunks/database.js";
const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};
const ensureUserRoleExists = async () => {
  const userRole = await db.roles.findUnique({
    where: {
      name: "USER"
      /* USER */
    }
  });
  if (!userRole) {
    await db.roles.create({
      data: {
        name: "USER"
        /* USER */
      }
    });
  }
};
const ensureAdminRoleExists = async () => {
  const adminRole = await db.roles.findUnique({
    where: {
      name: "ADMIN"
      /* ADMIN */
    }
  });
  if (!adminRole) {
    await db.roles.create({
      data: {
        name: "ADMIN"
        /* ADMIN */
      }
    });
  }
};
const register = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { invalid: true });
  }
  const user = await db.user.findUnique({
    where: { email }
  });
  if (user) {
    return fail(400, { user: true });
  }
  await ensureUserRoleExists();
  await ensureAdminRoleExists();
  await db.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: {
        name: "ADMIN"
        /* ADMIN */
      } }
    }
  });
  throw redirect(303, "/auth/login");
};
const actions = { register };
export {
  actions,
  load
};
