import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Home from "../../pages/Home";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },

];

export default routes.map((route) => {
  const meta = {
    public: true,
    authorize: [],
  };

  return { ...route, meta };
});
