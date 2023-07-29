import config from "~/config";

import { HeaderOnly } from "~/layouts";
import { SidebarOnly } from "~/layouts";

import Home from "~/pages/Home";
import User from "~/pages/User";
import Category from "~/pages/Category";
import Product from "~/pages/Product";
import NewProduct from "~/pages/NewProduct";
import Login from "~/pages/Login";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.user, component: User },
  { path: config.routes.product, component: Product },
  { path: config.routes.category, component: Category },
  { path: config.routes.newproduct, component: NewProduct },
  { path: config.routes.login, component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
