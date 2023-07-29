import config from '~/config';

import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Type from '~/pages/Type';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.product, component: Product, layout: HeaderOnly },
    { path: config.routes.type, component: Type },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.cart, component: Cart, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
