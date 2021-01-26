import Login from "../../pages/Login";
import Register from "../../pages/Register";

const routes = [
  {
    path: "/login",
    alias: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },

];

export default routes.map((route) => {
  const meta = {
    public: true,
    authorize: [],
  };

  return { ...route, meta };
});
