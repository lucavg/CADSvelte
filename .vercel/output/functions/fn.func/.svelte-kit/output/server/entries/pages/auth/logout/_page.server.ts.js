import { r as redirect } from "../../../../chunks/index.js";
const load = async () => {
  throw redirect(302, "/");
};
const actions = {
  default({ cookies }) {
    cookies.set("session", "", {
      path: "/",
      expires: /* @__PURE__ */ new Date(0)
    });
    throw redirect(302, "/");
  }
};
export {
  actions,
  load
};
